import { Image, Pressable, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const welcome = () => {

	const router = useRouter();

	return (
		<ScreenWrapper bg="white">
			<StatusBar style="dark" />
			<View style={styles.container}>

				<View style={styles.centering}>
					<Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome-image.jpg')} />
				</View>

				<View style={styles.centering}>
					<Text style={styles.title}>Triphary</Text>
					<Text style={styles.tagline}>Discover, Connect, Travel</Text>
				</View>

				<View style={styles.footer}>
					<Button
						title="Getting Started"
						buttonStyle={{ marginHorizontal: wp(3) }}
						onPress={() => router.push('/signup')}
						loading={false}
						hasShadow={false}
					/>
					<View style={styles.bottomTextContainer}>
						<Text style={styles.bottomText}>Already have an ccount?</Text>
						<Pressable onPress={() => router.push('/login')}>
							<Text style={styles.loginText}>Login</Text>
						</Pressable>
					</View>
				</View>

			</View>
		</ScreenWrapper>
	)
}

export default welcome

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		paddingHorizontal: wp(6),
	},
	welcomeImage: {
		height: hp(30),
		width: wp(100),
		alignSelf: 'center',
	},
	centering: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: theme.colors.text,
		fontSize: hp(4),
		fontWeight: theme.fonts.extraBold as TextStyle["fontWeight"],
	},
	tagline: {
		color: theme.colors.text,
		fontSize: hp(1.6),
		textAlign: 'center',
		paddingHorizontal: wp(6),
	},
	footer: {
		gap: 20,
		width: '100%',
	},
	bottomTextContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
	bottomText: {

	},
	loginText: {
		textAlign: 'center',
		// color: theme.colors.text,
		color: theme.colors.primary,
		fontWeight: theme.fonts.semibold as TextStyle["fontWeight"],
		fontSize: hp(1.6),
	}
});