import { Alert, Button, Pressable, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { CirclePlusIcon, EditIcon, NotificationIcon, UserIcon } from '@/assets/icons/Icons'
import { useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'

const Home = () => {

	const {user, userData, setUserState} = useAuth();
	const router = useRouter();

	console.log("👮 User (home): ", JSON.stringify(user, null, 2));

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

