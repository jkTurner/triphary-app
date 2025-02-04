import { Pressable, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import { hp, wp } from '@/helpers/common'
import { useAuth } from '@/context/AuthContext'
import Avatar from '@/components/Avatar'
import { useRouter } from 'expo-router'
import { theme } from '@/constants/theme'

const NewPost = () => {

	const { userData } = useAuth();
	const router = useRouter();

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Header title="Create Post" showBackButton={true} />
				<ScrollView contentContainerStyle={{gap: 20}}>

					{/* user info */}
					<View style={styles.userHeader}>
						<Pressable onPress={()=> router.push('/profile')}>
							<Avatar
								uri={userData?.image ?? undefined}
								size={hp(6.5)}
								// style={{borderWidth: 2}}
							/>
						</Pressable>
						<View style={{gap: 2}}>
							<Text style={styles.userName}>
								{ userData && userData.name }
							</Text>
							<Text>
								Public
							</Text>
						</View>
					</View>

				</ScrollView>
			</View>
		</ScreenWrapper>
	)
}

export default NewPost

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 30,
		paddingHorizontal: wp(4),
		gap: 15,
	},
	userHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	userName: {
		fontSize: hp(2.2),
		fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
		color: theme.colors.text,
	},
	publicText: {
		fontSize: hp(1.7),
		fontWeight: theme.fonts.medium as TextStyle['fontWeight'],
		color: theme.colors.textLight,
	}
})