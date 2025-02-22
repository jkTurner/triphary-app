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

	// console.log("👮 User (home): ", JSON.stringify(user, null, 2));

	const [posts, setPosts] = useState<Post[]>([]);

	const getPosts = async () => {

		limit = limit + 10;
		let res = await fetchPost();

		// console.log('fetching post: ', limit);

		if (res.success) {
			setPosts(res.data ?? []);
		}
	}

	useEffect(() => {
		getPosts();
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
						/>}
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

