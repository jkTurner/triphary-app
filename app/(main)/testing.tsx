import { StyleSheet, Text, TextStyle, TouchableOpacity, View, Image as RNImage, Alert, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { hp, stripHtmlTags, wp } from '@/helpers/common';
import Avatar from '@/components/Avatar';
import moment from 'moment'
import { CommentIcon, HeartIcon, HeartIconFilled, PlayIcon, ShareIcon, ThreeDotsIcon } from '@/assets/icons/Icons';
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image';
import { getImageDimensions, getUserMediaSrc, getVideoThumbnailSize } from '@/services/imageService';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { createPostLike, removePostLike } from '@/services/postService';
import { PostLikesType } from '@/types/types';

interface User {
	id: string;
	name: string;
	image?: string;
}

interface Post {
	id: string;
	content: string;
	created_at: string;
	user: User;
	body?: string;
	media?: string;
	postLikes?: PostLikesType[];
}

interface PostCardProps {
	item: Post;
	currentUser: User;
	router: ReturnType<typeof useRouter>;
	handlePauseAllVideos: (currentId: string) => void;
	videoPlayerRefs: { [key: string]: VideoPlayer };
	setVideoPlayerRefs: React.Dispatch<React.SetStateAction<{ [key: string]: VideoPlayer }>>;
}

const openPostDetail = () => {}

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
	handlePauseAllVideos,
	videoPlayerRefs,
	setVideoPlayerRefs,
}) => {

	// console.log('post item: ', item);

	const createdAt = moment(item?.created_at).format('MMM D');
	const isImage = item?.media && /\.(jpg|jpeg|png|webp)$/i.test(item.media);
	const isVideo = item?.media && /\.(mp4|mov|avi|mkv|webm)$/i.test(item.media);

	const videoUri = item?.media ? getUserMediaSrc(item.media) : '';
	const videoPlayer = isVideo ? useVideoPlayer(videoUri, (player) => {
		player.loop = false;
		player.volume = 1.0;
	}) : null;

	const SUPABASE_STORAGE_URL = "https://byqasqcvwfgxerrysacf.supabase.co/storage/v1/object/public/uploads/";
	const [imageHeight, setImageHeight] = useState(hp(40)); // Default height
	const [videoHeight, setVideoHeight] = useState(hp(40));
	const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
	const [showVideo, setShowVideo] = useState(false);
	// const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState<PostLikesType[]>([]);
	// const liked = likes.filter(like => like.userId == currentUser?.id) [0] ? true : false;
	const liked = likes.some(like => like.userId === currentUser?.id);
	// const likes = [];

	// useEffect(() => {
	// 	setLikes(item?.postLikes || []);
	// }, [item?.postLikes])

	useEffect(() => {
		if (JSON.stringify(likes) !== JSON.stringify(item?.postLikes || [])) {
			setLikes(item?.postLikes || []);
		}
	}, [item?.postLikes]);

	const onLike = async () => {
		console.log("onLike fires");

		if (liked) {
			const updatedLikes = likes.filter(like => like.userId !== currentUser?.id);
			setLikes(updatedLikes);
			const res = await removePostLike(item?.id, currentUser?.id);
			if (!res.success) {
				Alert.alert('Post', 'Something went wrong!');
				setLikes([...likes]);
			}
		} else {
			const newLike = { userId: currentUser?.id, postId: item?.id };
			setLikes([...likes, newLike]);
			const res = await createPostLike(newLike);
			if (!res.success) {
				Alert.alert('Post', 'Something went wrong!');
				setLikes([...likes]);
			}
		}
	};

	const onShare = async () => {
		// let content = { message: stripHtmlTags(item?.body ?? '') };
		// Share.share(content);
	}

	useEffect(() => {
		if (isVideo && videoPlayer) {
			setVideoPlayerRefs((prev) => ({ ...prev, [item.id]: videoPlayer }));
		}
	}, [videoPlayer]);

	// ✅ Use `useEvent` to track playing state
	const event = videoPlayer
		? useEvent(videoPlayer, 'playingChange', { isPlaying: videoPlayer.playing })
		: { isPlaying: false };

	const isPlaying = event.isPlaying;

	// ✅ Automatically pause other videos when one starts playing
	useEffect(() => {
		if (isPlaying) {
		console.log(`🎥 Video ID: ${item.id} started playing`);
		handlePauseAllVideos(item.id);
		}
	}, [isPlaying]);

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
			// console.log("🎥 Generating thumbnail for:", videoUrl);

			getVideoThumbnailSize(videoUrl)
				.then(({ uri, calculatedHeight }) => {
					setVideoThumbnail(uri);
					setVideoHeight(calculatedHeight);
					// console.log(`✅ Video Height Set: ${calculatedHeight}`);
				})
				.catch((error) => console.error("❌ Error getting video dimensions:", error));
		}
	}, [item?.media]);

	return (
		<View style={[styles.container]}>
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Avatar size={hp(4.5)} uri={item?.user?.image} />
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
					{item?.body && (
						<RenderHtml
							contentWidth={wp(100)}
							source={{ html: item?.body ?? '<p>No content available</p>' }}
							tagsStyles={tagsStyles}
						/>
					)}
				</View>

				{isImage && (
					<Image source={getUserMediaSrc(item?.media)} transition={100} style={[styles.postMedia, { height: imageHeight }]} contentFit="cover" onError={(error) => console.log('Image failed to load:', error)} />
				)}

				{isVideo && videoPlayer && (
					<TouchableOpacity onPress={() => {
						setShowVideo(true);
						videoPlayer?.play();
					}}>
						{!showVideo ? (
							<View>
								<Image source={{ uri: videoThumbnail ?? '' }} transition={100} style={[styles.postMedia, { height: videoHeight }]} contentFit='cover' />
								<View style={styles.playIconContainer}>
									<PlayIcon size={hp(6)} color="white" />
								</View>
							</View>
						) : (
							<VideoView player={videoPlayer} style={[styles.postMedia, { height: videoHeight }]} nativeControls />
						)}
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.footer}>
				{/* likes */}
				<View style={styles.footerButton}>
					<TouchableOpacity onPress={onLike}>
						<HeartIcon size={24} fill={liked? theme.colors.rose : "none"} color={liked? theme.colors.rose : theme.colors.textLight} />
					</TouchableOpacity>
					<Text style={styles.count}>
						{
							likes?.length
						}
					</Text>
				</View>
				{/* comments */}
				<View style={styles.footerButton}>
					<TouchableOpacity>
						<CommentIcon size={24} strokeWidth={1} color={theme.colors.textLight} />
					</TouchableOpacity>
					{/* <Text style={styles.count}>
						{
							likes?.length
						}
					</Text> */}
				</View>
				{/* share */}
				<View style={styles.footerButton}>
					<TouchableOpacity onPress={onShare}>
						<ShareIcon size={24} color={theme.colors.textLight} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default PostCard;

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
	},
	playIconContainer: {
		position: 'absolute',
		inset: 0, // makes the overlay cover the entire thumbnail
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		borderRadius: hp(4),
	},
	pauseButton: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		padding: 8,
		borderRadius: 5,
	},
	pauseButtonText: {
		color: 'white',
		fontSize: hp(1.5),
		fontWeight: 'bold',
	},
})