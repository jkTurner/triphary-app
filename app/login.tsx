import { Alert, Pressable, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { StatusBar } from 'expo-status-bar'
import Input from '@/components/Input'
import { MailIcon, Password } from '@/assets/icons/Icons'
import Button from '@/components/Button'
import { supabase } from '@/lib/supabase'

const Login = () => {

	const router = useRouter();
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		// validation - making sure a user enters email and password
		if (!emailRef.current.trim()) {
			Alert.alert('Login', "Please enter your email.");
			return;
		}
		if (!passwordRef.current.trim()) {
			Alert.alert('Login', "Please enter your password.");
			return;
		}

		let email = emailRef.current.trim();
		let password = passwordRef.current.trim();

		setLoading(true);
		const {error} = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		setLoading(false);

		if (error) {
			console.log('❌ Login Error(login)', error);
			Alert.alert('Login', error.message);
		}

	}

	return (
		<ScreenWrapper bg="white">

			<StatusBar style="dark" />

			<View style={[styles.container, { backgroundColor: "" }]}>

				<BackButton router={router} />
				<View>
					<Text style={styles.welcomeText}>Hey,</Text>
					<Text style={styles.welcomeText}>Welcome Back</Text>
				</View>

				<View style={styles.form}>

					<Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
						Please login to continue
					</Text>
					<Input
						containerStyle={{}}
						icon={<MailIcon size={26} strokeWidth={1} />}
						placeholder='Enter your email'
						onChangeText={ value=> emailRef.current = value }
					/>
					<Input
						containerStyle={{}}
						icon={<Password size={26} strokeWidth={1} />}
						placeholder='Enter your password'
						secureTextEntry
						onChangeText={ value=> passwordRef.current = value }
					/>
					<Text style={styles.forgotPassword}>
						Forgot Password?
					</Text>

					<Button title={'Login'} loading={loading} onPress={onSubmit} />

				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>
						Don't have an account?
					</Text>
					<Pressable onPress={() => router.push('/signup')}>
						<Text style={[styles.footerText, {color: theme.colors.primary, fontWeight: theme.fonts.semibold as TextStyle['fontWeight']}]}>
							Sign Up
						</Text>
					</Pressable>
				</View>

			</View>

		</ScreenWrapper>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 45,
		paddingHorizontal: wp(5),
	},
	welcomeText: {
		fontSize: hp(4),
		fontWeight: theme.fonts.bold as TextStyle["fontWeight"],
		color: theme.colors.text,
	},
	form: {
		gap: 25,
	},
	forgotPassword: {
		textAlign: 'right',
		fontSize: hp(1.6),
		fontWeight: theme.fonts.semibold as TextStyle["fontWeight"],
		color: theme.colors.text,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
	footerText: {
		textAlign: 'center',
		color: theme.colors.text,
		fontSize: hp(1.6),
	},
})

