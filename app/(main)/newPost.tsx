import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/Avatar';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import RichTextEditor from '@/components/RichTextEditor';
import { hp, wp } from '@/helpers/common';
import { DeleteIcon, ImageIcon, VideoIcon } from '@/assets/icons/Icons';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker'
import { getUserMediaSrc, uploadFile } from '@/services/imageService';
import { useVideoPlayer, VideoView } from 'expo-video';
import { createOrUpdatePost } from '@/services/postService';

const NewPost = () => {
	const { user, userData } = useAuth();
	const [loading, setLoading] = useState(false);
	const [mediaUri, setMediaUri] = useState<string | null>(null);
	const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
	const [richText, setRichText] = useState('');

	const router = useRouter();

	const handleTextChange = (text: string) => {
		setRichText(text);
	};

	const videoPlayer = useVideoPlayer(mediaUri ?? '', (player) => {
		player.loop = true;
		player.play();
	});

	const onPick = async (isImage: boolean) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: isImage ? ['images'] : ['videos'],
			allowsEditing: true,
			aspect: isImage ? [4, 3] : undefined,
			quality: 0.7,
		});

		if (!result.canceled) {
			console.log("✅ Selected Media:", result.assets[0].uri);
			setMediaUri(result.assets[0].uri);
			setMediaType(isImage ? 'image' : 'video')
		} else {
			console.log("❌ User canceled the picker");
		}
	};

	const handleNavigation = () => {
		if (router.canGoBack()) {
		  router.back();
		} else {
		  router.push('/home');
		}
	};

	const onSubmit = async () => {

		if (!richText.trim()) {
			Alert.alert('Post', "Please add text to the post.");
			return;
		}

		console.log("🚀 Sibmitting Post...");
		setLoading(true);

		const postData = {
			body: richText,
			userId: user?.id,
			media: mediaUri ? { uri: mediaUri, type: mediaType }: null,
		};

		const res = await createOrUpdatePost(postData);

		console.log("🟡 Post Response: ", res);

		if (res.success) {
			setLoading(false);
			setMediaUri(null);
			setMediaType(null);
			setRichText('');

			Alert.alert(
				"Create Post",
				"Successfully Created a Post",
				[{ text: "OK", onPress: () => handleNavigation() }]
			);
		}
	};

	return (
		<ScreenWrapper bg="white">
			<View style={styles.container}>
				<Header title="Create Post" showBackButton={true} />
				<ScrollView contentContainerStyle={{ gap: 20 }}>

					{/* user info */}
					<View style={styles.userHeader}>
						<Pressable onPress={() => router.push('/profile')}>
							<Avatar uri={userData?.image ?? undefined} size={50} />
						</Pressable>
						<View style={{ gap: 2 }}>
							<Text style={styles.userName}>{userData?.name}</Text>
							<Text style={styles.publicText}>Public</Text>
						</View>
					</View>

					<RichTextEditor onChange={handleTextChange} />

					{/* add media */}
					<View style={styles.media}>
						<Text style={styles.addImageText}>Add Media</Text>
						<View style={styles.mediaIcons}>
							<TouchableOpacity onPress={() => onPick(true)}>
								<ImageIcon />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => onPick(false)}>
								<VideoIcon />
							</TouchableOpacity>
						</View>
					</View>

					{/* media preview  */}
					{mediaUri && (
						<View style={styles.file}>
							{mediaType === "video" ? (
								<VideoView
									player={videoPlayer}
									style={styles.video}
									nativeControls
								/>
							) : (
								<View>
									<Image
										source={getUserMediaSrc(mediaUri)}
										resizeMode="cover"
										style={styles.mediaPreview}
									/>
								</View>

							)}
							<Pressable style={styles.deleteIcon} onPress={() => setMediaUri(null)}>
								<DeleteIcon color="white" size={22} />
							</Pressable>
						</View>
					)}

				</ScrollView>
				<Button title="POST" loading={loading} onPress={onSubmit} />

			</View>
		</ScreenWrapper>
	);
};

export default NewPost;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 30,
		paddingHorizontal: 20,
		gap: 15,
	},
	userHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	userName: {
		fontSize: 18,
		fontWeight: "600",
		color: theme.colors.text,
	},
	publicText: {
		fontSize: 14,
		fontWeight: "500",
		color: theme.colors.textLight,
	},
	media: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1.5,
		padding: 12,
		paddingHorizontal: 18,
		borderRadius: theme.radius.xl,
		borderCurve: 'continuous',
		borderColor: theme.colors.gray,
	},
	mediaIcons: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15
	},
	addImageText: {
		fontSize: hp(1.9),
		fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
		color: theme.colors.text,
	},
	file: {
		width: '100%',
		height: hp(30),
		borderRadius: theme.radius.xl,
		// backgroundColor: 'red',
	  },
	mediaPreview: {
		width: '100%',
		height: hp(24),
	},
	deleteIcon: {
		position: 'absolute',
		top: 10,
		right: 10,
		padding: 7,
		borderRadius: 50,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	video: {
		width: '100%',
		height: hp(24),
		// flex: 1
	},
});


