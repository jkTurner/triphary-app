import { Alert, Button, FlatList, Pressable, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { CirclePlusIcon, EditIcon, NotificationIcon, UserIcon } from '@/assets/icons/Icons'
import { useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'
import { fetchPost } from '@/services/postService'
import PostCard from '@/components/PostCard'
import Loading from '@/components/Loading'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { getUserService } from '@/services/userService'

interface Post {
	id: string;
	content: string;
	created_at: string;
	user: {
		id: string;
		name: string;
		image?: string;
	}
}

var limit = 0;

const Home = () => {

	const {user, userData, setUserState} = useAuth();
	const router = useRouter();
	const [posts, setPosts] = useState<Post[]>([]);
	const [videoPlayerRefs, setVideoPlayerRefs] = useState<{ [key: string]: any }>({});

	const handlePauseAllVideos = (currentId: string | number) => {
		console.log(`▶️ Attempting to pause all videos except: ${currentId}`);

		Object.entries(videoPlayerRefs).forEach(([postId, player]) => {
			if (player) {
				if (`${postId}` !== `${currentId}`) { // ensure both are strings
					console.log(`⏸ Pausing video with ID: ${postId}`);
					player.pause();
				} else {
					console.log(`✅ Keeping video playing: ${postId}`);
				}
			} else {
				console.log(`⚠️ No player found for: ${postId}`);
			}
		});
	};

	const getPosts = async () => {

		limit = limit + 5;

		console.log('fetching post: ', limit);
		let res = await fetchPost(limit);
		if (res.success) {
			setPosts(res.data ?? []);
		}
	}

	const handlePostEvent = async (payload: RealtimePostgresChangesPayload<any>) => {
		if (payload.eventType == 'INSERT' && payload?.new?.id) {
			const newPost = { ...payload.new };
			const res = await getUserService(newPost.userId);
			newPost.user = res.success? res.data: {};
			setPosts(prevPosts => [newPost, ...prevPosts]);
		}
	}

	useEffect(() => {

		const postChannel = supabase
		.channel('posts')
		.on('postgres_changes', {event: '*', schema: 'public', table: 'posts'}, handlePostEvent)
		.subscribe();

		// getPosts();

		return () => {
			supabase.removeChannel(postChannel);
		}
	}, [])

	return (
		<ScreenWrapper bg="white">
			<View style={styles.container}>
				{/* header */}
				<View style={styles.header}>
					<Text style={styles.title}>Triphary</Text>
					<View style={styles.icons}>
						<Pressable onPress={()=> router.push('/testing')}>
							<EditIcon size={hp(3.2)} strokeWidth={1.5} color={theme.colors.text} />
						</Pressable>
						<Pressable onPress={()=> router.push('/notifications')}>
							<NotificationIcon size={hp(3.2)} strokeWidth={1.5} color={theme.colors.text} />
						</Pressable>
						<Pressable onPress={()=> router.push('/newPost')}>
							<CirclePlusIcon size={hp(3.2)} strokeWidth={1.5} color={theme.colors.text} />
						</Pressable>
						<Pressable onPress={()=> router.push('/profile')}>
							<Avatar
								uri={userData?.image ?? undefined}
								size={hp(4.3)}
								// style={{borderWidth: 2}}
							/>
						</Pressable>
					</View>
				</View>

				{/* post */}
				<FlatList
					data={posts}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listStyle}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) =>
						<PostCard
							item={item}
							currentUser={{
								id: userData?.id ?? 'guest-id', // Ensure id is always a string
								name: userData?.name ?? 'Guest',
								image: userData?.image ?? undefined,
							}}
							router={router}
							handlePauseAllVideos={handlePauseAllVideos}
							videoPlayerRefs={videoPlayerRefs}
							setVideoPlayerRefs={setVideoPlayerRefs}
					/>}
					ListFooterComponent={
						<View style={{marginTop: posts.length == 0 ? hp(35) : 15, marginBottom: posts.length == 0 ? hp(35) : 30}}>
							<Loading />
						</View>
					}
					onEndReached={() => {
						getPosts();
						console.log('got to the end');
					}}
					onEndReachedThreshold={0}
					windowSize={10} // Increases the number of visible items before unmounting
					maxToRenderPerBatch={5} // Loads more items at once
					removeClippedSubviews={false} // Prevents aggressive unmounting
				/>

			</View>
		</ScreenWrapper>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
		marginHorizontal: wp(4)
	},
	title: {
		color: theme.colors.text,
		fontSize: hp(3.2),
		fontWeight: theme.fonts.bold as TextStyle['fontWeight']
	},
	avatarImage: {
		height: hp(4.3),
		width: hp(4.3),
		borderRadius: theme.radius.sm,
		borderCurve: 'continuous',
		borderColor: theme.colors.gray,
		borderWidth: 3,
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 18,
	},
	listStyle: {
		paddingTop: 20,
		paddingHorizontal: wp(4),
	},
	noPosts: {
		fontSize: hp(2),
		textAlign: 'center',
		color: theme.colors.text,
	},
	pill: {
		position: 'absolute',
		right: -10,
		top: -4,
		height: hp(2.2),
		width: hp(2.2),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: theme.colors.roseLight,
	},
	pillText: {
		color: 'white',
		fontSize: hp(1.2),
		fontWeight: theme.fonts.bold as TextStyle['fontWeight'],
	}
})
