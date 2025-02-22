import { StyleSheet, Text, TextStyle, TouchableOpacity, View, Image as RNImage } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import Avatar from './Avatar';
import moment from 'moment'
import { ThreeDotsIcon } from '@/assets/icons/Icons';
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image';
import { getImageDimensions, getUserMediaSrc, getVideoThumbnailSize } from '@/services/imageService';
import { useVideoPlayer, VideoView } from 'expo-video';

interface Post {
	id: string;
	content: string;
	created_at: string;
	user: User;
	body?: string;
	media?: string;
}

interface User {
	id: string;
	name: string;
	image?: string;
}

interface PostCardProps {
	item: Post;
	currentUser: User;
	router: ReturnType<typeof useRouter>;
}

const openPostDetail = () => {

}

const textStyle = {
	color: theme.colors.dark,
	fontSize: hp(1.75),
}

const tagsStyles = {
	div: textStyle,
	p: textStyle,
	ol: textStyle,
	h1: {
		color: theme.colors.dark
	},
	h4: {
		color: theme.colors.dark
	}
}

const PostCard: React.FC<PostCardProps> = ({
	item,
	currentUser,
	router,
}) => {

	console.log('post item: ', item);

	const createdAt = moment(item?.created_at).format('MMM D');
	const isImage = item?.media && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.media);
    const isVideo = item?.media && /\.(mp4|mov|avi|mkv|webm)$/i.test(item.media);

	const videoUri = item?.media ? getUserMediaSrc(item.media) : '';
	const videoPlayer = isVideo ? useVideoPlayer(videoUri, (player) => {
		player.loop = false;
		player.volume = 1.0;
	}) : null;

	const SUPABASE_STORAGE_URL = "https://byqasqcvwfgxerrysacf.supabase.co/storage/v1/object/public/uploads/";
	const [imageHeight, setImageHeight] = useState(hp(40)); // Default height
	const [videoHeight, setVideoHeight] = useState(hp(40));

	useEffect(() => {
		if(item?.media && isImage) {
			getImageDimensions(item.media)
				.then((calculatedHeight) => setImageHeight(calculatedHeight))
				.catch((error) => console.log("Image dimension fetch failed: ", error));
		}
	}, [item?.media])

	useEffect(() => {
		if (item?.media && isVideo) {
			const videoUrl = `${SUPABASE_STORAGE_URL}${item.media}`;
			console.log("🎬 Fetching video size for:", videoUrl);

			getVideoThumbnailSize(videoUrl)
				.then((calculatedHeight) => setVideoHeight(calculatedHeight))
				.catch((error) => console.error("❌ Error getting video dimensions: ", error));
		}
	}, [item?.media]);

	return (
		<View style={[styles.container]}>
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Avatar
						size={hp(4.5)}
						uri={item?.user?.image}
					/>
					<View style={{gap: 2}}>
						<Text style={styles.username}>{item?.user?.name}</Text>
						<Text style={styles.postTime}>{createdAt}</Text>
					</View>
				</View>
				<TouchableOpacity onPress={openPostDetail}>
					<ThreeDotsIcon size={hp(3.4)} strokeWidth={3} />
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				<View style={styles.postBody}>
					{
						item?.body && (
							<RenderHtml
								contentWidth={wp(100)}
								source={{ html: item?.body ?? '<p>No content available</p>' }}
								tagsStyles={tagsStyles}
							/>
						)
					}
				</View>

                {/* Show Image if it's an Image */}
				{isImage && (
					<Image
						source={getUserMediaSrc(item?.media)}
						transition={100}
						style={[styles.postMedia, { height: imageHeight }]} // ✅ Uses calculated height
						contentFit="cover"
						onError={(error) => console.log('Image failed to load:', error)}
					/>
				)}


                {/* Show Video if it's a Video */}
				{isVideo && videoPlayer && (
					<VideoView
						player={videoPlayer}
						style={[styles.postMedia, { height: videoHeight }]} // ✅ Uses calculated height
						nativeControls
					/>
				)}

			</View>

		</View>
	)
}

export default PostCard

const styles = StyleSheet.create({
	container: {
		gap: 10,
		marginBottom: 15,
		borderRadius: theme.radius.xxl*1.1,
		borderCurve: 'continuous',
		padding: 10,
		paddingVertical: 12,
		backgroundColor: 'white',
		borderWidth: 0.5,
		borderColor: theme.colors.gray,
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowRadius: 6,
		elevation: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	username: {
		fontSize: hp(1.7),
		color: theme.colors.textDark,
		fontWeight: theme.fonts.medium as TextStyle['fontWeight']
	},
	postTime: {
		fontSize: hp(1.4),
		color: theme.colors.textLight,
		fontWeight: theme.fonts.medium as TextStyle['fontWeight']
	},
	content: {
		gap: 10,
	},
	postMedia: {
		height: hp(40),
		width: '100%',
		borderRadius: theme.radius.xl,
		borderCurve: 'continuous',
	},
	postBody: {
		marginLeft: 5,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	},
	footerButton: {
		marginLeft: 5,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 18,
	},
	count: {
		color: theme.colors.text,
		fontSize: hp(1.8),
	}
})