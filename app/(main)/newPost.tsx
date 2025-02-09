import { Image, Pressable, ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/Avatar';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import RichTextEditor from '@/components/RichTextEditor';
import { hp } from '@/helpers/common';
import { DeleteIcon, ImageIcon, VideoIcon } from '@/assets/icons/Icons';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker'
import { getSupabaseFileUrl, getUserImageSrc, uploadFile } from '@/services/imageService';
import { ResizeMode, Video } from 'expo-av';

const NewPost = () => {
	const { userData } = useAuth();
	const router = useRouter();
	// const bodyRef = useRef("");
	// const editorRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

	const [richText, setRichText] = useState('');

	const handleTextChange = (text: string) => {
	setRichText(text);
	};

	const onPick = async (isImage: boolean) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: isImage ? ['images'] : ['videos'],
			allowsEditing: true,
			aspect: isImage ? [4, 3] : undefined,
			quality: 0.7,
		});

		if (!result.canceled) {
			console.log("✅(newPost.tsx) Selected Image file:", result.assets[0].uri);
			setFile(result.assets[0]); // ✅ Correctly setting the file
		} else {
			console.log("❌(newPost.tsx) user canceled the picker");
		}
	};

	useEffect(() => {
		console.log("📸 (UseEffect) File State Updated: ", file);
	}, [file])

	const isLocalFile = (file: ImagePicker.ImagePickerAsset | string | null): boolean => {
		if (!file) return false;
		return typeof file === 'object';
	}

	const getFileType = (file: ImagePicker.ImagePickerAsset | string | null): "image" | "video" | "unknown" => {
		if (!file) return "unknown";

		if (isLocalFile(file)) {
			const assetType = (file as ImagePicker.ImagePickerAsset).type;
			return assetType === "image" || assetType === "video" ? assetType : "unknown";
		}

		return typeof file === "string" && file.includes("postImage") ? "image" : "video";
	};

	const getFileUri = (file: ImagePicker.ImagePickerAsset | string | null): string | null => {
		if (!file) return null;

		if (typeof file === "object" && "uri" in file) {
			return file.uri; // ✅ Ensure we return the local file URI
		}

		return typeof file === "string" ? getSupabaseFileUrl(file)?.uri ?? null : null;
	};


	const onSubmit = async () => {
		if (!file) {
			console.log("❌ No file selected");
			return;
		}

		try {
			setLoading(true);

			const fileType = getFileType(file);
			if (fileType === "unknown") {
				console.log("❌ Unsupported file type");
				return;
			}

			const folderName = fileType === "image" ? "post_images" : "post_videos";
			const fileUri = getFileUri(file);
			if (!fileUri) {
				console.log("❌ File URI not found");
				return;
			}

			console.log(`📤 Uploading to ${folderName}:`, fileUri);

			// Upload file
			const uploadResponse = await uploadFile(folderName, fileUri, fileType === "image");

			if (!uploadResponse.success) {
				console.error("❌ Upload failed:", uploadResponse.msg);
				return;
			}

			console.log("✅ Upload successful! File Path:", uploadResponse.data);

			// Reset state after upload
			setFile(null);

		} catch (error) {
			console.error("❌ Error uploading file:", error);
		} finally {
			setLoading(false);
		}
	};


	console.log('(newPost.tsx) ✅✅✅ file uri: ', getFileUri(file));

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

					{/* preview media  */}
					{file && (
						<View style={styles.file}>
							{getFileType(file) === "video" ? (
								<Video
									source={getUserImageSrc(file)}
									style={{flex: 1}}
									useNativeControls
									resizeMode={ResizeMode.COVER}
									isLooping
								/>
							) : (
								<Image
									source={getUserImageSrc(file)}
									resizeMode="cover"
									style={styles.mediaPreview}
								/>

							)}
							<Pressable style={styles.deleteIcon} onPress={() => setFile(null)}>
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
		height: hp(30),
		width: '100%',
		borderRadius: theme.radius.xl,
		overflow: 'hidden',
		borderCurve: 'continuous',
	},
	mediaPreview: {
		// width: '100%'
		// aspectRatio: 4 / 3,
	},
	deleteIcon: {
		position: 'absolute',
		top: 10,
		right: 10,
		padding: 7,
		borderRadius: 50,
		backgroundColor: 'rgba(0,0,0,0.5)',
	}
});



// import { Pressable, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native'
// import React, { useRef, useState } from 'react'
// import ScreenWrapper from '@/components/ScreenWrapper'
// import Header from '@/components/Header'
// import { hp, wp } from '@/helpers/common'
// import { useAuth } from '@/context/AuthContext'
// import Avatar from '@/components/Avatar'
// import { useRouter } from 'expo-router'
// import { theme } from '@/constants/theme'
// import { RichEditor } from 'react-native-pell-rich-editor'
// import MyTextEditor from '@/components/MyTextEditor'
// import RichTextEditor from '@/components/RichTextEditor'

// const NewPost = () => {

// 	const { userData } = useAuth();
// 	const router = useRouter();
// 	const textBodyRef = useRef("");
// 	const editorRef = useRef<RichEditor | null>(null);
// 	const [loading, setLoading] = useState(false);
// 	const [file, setFile] = useState<File | null>(null);

// 	return (
// 		<ScreenWrapper>
// 			<View style={styles.container}>
// 				<Header title="Create Post" showBackButton={true} />
// 				<ScrollView contentContainerStyle={{gap: 20}}>

// 					{/* user info */}
// 					<View style={styles.userHeader}>
// 						<Pressable onPress={()=> router.push('/profile')}>
// 							<Avatar
// 								uri={userData?.image ?? undefined}
// 								size={hp(6.5)}
// 								// style={{borderWidth: 2}}
// 							/>
// 						</Pressable>
// 						<View style={{gap: 2}}>
// 							<Text style={styles.userName}>
// 								{ userData && userData.name }
// 							</Text>
// 							<Text style={styles.publicText}>
// 								Public
// 							</Text>
// 						</View>
// 					</View>

// 					{/* user info */}
// 					<View style={styles.textEditor}>
// 						{/* <MyTextEditor /> */}
// 						<RichTextEditor
// 							editorRef={editorRef}
// 							onChange={(textBody) => { textBodyRef.current = textBody; }}
// 						/>
// 					</View>

// 				</ScrollView>
// 			</View>
// 		</ScreenWrapper>
// 		// <DomWrapper />
// 	)
// }

// export default NewPost

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		marginBottom: 30,
// 		paddingHorizontal: wp(4),
// 		gap: 15,
// 	},
// 	userHeader: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		gap: 12,
// 	},
// 	userName: {
// 		fontSize: hp(2.2),
// 		fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
// 		color: theme.colors.text,
// 	},
// 	publicText: {
// 		fontSize: hp(1.7),
// 		fontWeight: theme.fonts.medium as TextStyle['fontWeight'],
// 		color: theme.colors.textLight,
// 	},
// 	textEditor: {

// 	}
// })




