import { Alert, Pressable, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth, UserData } from '@/context/AuthContext'
import { Router, useRouter } from 'expo-router'
import { User } from '@supabase/supabase-js'
import { theme } from '@/constants/theme'
import { hp, wp } from '@/helpers/common'
import Header from '@/components/Header'
import { BookOpenIcon, EditIcon, LogoutIcon, MailIcon, PhoneIcon } from '@/assets/icons/Icons'
import { supabase } from '@/lib/supabase'
import Avatar from '@/components/Avatar'

const Profile = () => {

	const { user, userData, setUserState } = useAuth();
	const router = useRouter();

	const onLogout = async () => {
		const {error} = await supabase.auth.signOut();
		if (error) {
			Alert.alert('Sign out', "Error signing out")
		}
	}

	const handleLogout = async () => {
		// show confirm model
		Alert.alert('Confirm', "Are you sure you want to log out?", [
			{
				text: 'Cancel',
				onPress: () => console.log('model cancelled'),
				style: 'cancel', // only apply to iOS
			},
			{
				text: 'Logout',
				onPress: () => onLogout(),
				style: 'destructive', // only apply to iOS
			}
		])
	}

	return (
		<ScreenWrapper bg="white">
			<UserHeader user={user} userData={userData} router={router} handleLogout={handleLogout} />
		</ScreenWrapper>
	)
}

interface UserHeaderProps {
	user: User | null;
	userData: UserData | null;
	router: Router;
	handleLogout: ()=> void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, userData, router, handleLogout }) => {
	return (
		<View style={[styles.headerContainer]}>
		{/* // <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4)}}> */}
			<View>
				<Header
					title={"Profile"}
					showBackButton={true}
					mb={30}
				/>
				<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
					<LogoutIcon
						color={theme.colors.rose}
					/>
				</TouchableOpacity>
			</View>

			{/* user info */}
			<View style={styles.container}>
				<View style={{gap: 15}}>

					{/* profile pic & edit button */}
					<View style={styles.avatarContainer}>
						<Avatar
							uri={userData?.image ?? undefined}
							size={hp(12)}
						/>
						<Pressable style={styles.editIcon} onPress={()=> router.push('/editProfile')}>
							<EditIcon strokeWidth={2.5} size={20} />
						</Pressable>
					</View>

					{/* username and address */}
					<View style={{alignItems: 'center', gap: 4}}>
						<Text style={styles.userName}>{userData && userData.name}</Text>
						<Text style={styles.infoText}>{user && userData?.address}</Text>
					</View>

					{/* email, phone, and bio */}
					<View style={{gap: 10}}>
						<View style={[styles.info]}>
							<MailIcon size={20} color={theme.colors.textLight} />
							<Text style={styles.infoText}>{user && user.email}</Text>
						</View>
						{ userData?.phoneNumber && (
								<View style={[styles.info]}>
									<PhoneIcon size={20} color={theme.colors.textLight} />
									<Text style={styles.infoText}>{userData?.phoneNumber}</Text>
								</View>
							)
						}
						<View style={[styles.bio]}>
							<BookOpenIcon size={20} color={theme.colors.textLight} />
							<Text style={styles.infoText}>{userData && userData?.bio}</Text>
						</View>
					</View>

				</View>
			</View>

		</View>
	)
}

export default Profile

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		flex: 1,
		paddingHorizontal: wp(4),
		// backgroundColor: 'red'
	},
	headerText: {
		fontSize: 18,
		fontWeight: theme.fonts.bold as TextStyle['fontWeight'],
		color: theme.colors.text,
	},
	headerShape: {
		width: wp(100),
		height: hp(20),
	},
	avatarContainer: {
		height: hp(12),
		width: hp(12),
		alignSelf: 'center',
	},
	editIcon: {
		position: 'absolute',
		bottom: 0,
		right: -12,
		padding: 7,
		borderRadius: 50,
		backgroundColor: 'white',
		shadowColor: theme.colors.textLight,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.4,
		shadowRadius: 5,
		elevation: 7
	},
	userName: {
		fontSize: hp(3),
		fontWeight: '500',
		color: theme.colors.textDark,
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	infoText: {
		fontSize: hp(1.6),
		fontWeight: '500',
		color: theme.colors.textLight,
		// flexWrap: 'wrap',
		// width: '88%',
	},
	bio: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
	},
	logoutButton: {
		position: 'absolute',
		right: 0,
		padding: 5,
		borderRadius: theme.radius.sm,
		backgroundColor: '#FEE2E2',
	},
	listStyle: {
		paddingHorizontal: wp(4),
		paddingBottom: 30,
	},
	noPosts: {
		fontSize: hp(2),
		textAlign: 'center',
		color: theme.colors.text,
	}
})
