import { Alert, Pressable, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'
import { AddressIcon, BookOpenIcon, CameraIcon, PhoneIcon, UserIcon } from '@/assets/icons/Icons'
import Input from '@/components/Input'
import { useAuth } from '@/context/AuthContext'
import { getUserImageSrc, uploadFile } from '@/services/imageService'
import Button from '@/components/Button'
import { updateUserService } from '@/services/userService'
import { useRouter } from 'expo-router'

import * as ImagePicker from 'expo-image-picker';

const editProfile = () => {

	const {user: currentUser, userData, updateUserData} = useAuth();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const [user, setUser] = useState({
		name: '',
		phoneNumber: '',
		image: '' as string | null,
		bio: '',
		address: '',
	})

	useEffect(() => {
		if (currentUser) {
			setUser({
				name: userData?.name || '',
				phoneNumber: userData?.phoneNumber || '',
				image: userData?.image || null,
				address: userData?.address || '',
				bio: userData?.bio || '',
			})
			console.log("🟡 Set user in useEffect.")
		}
	}, [currentUser, userData])

	const onPickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
		});

		console.log("🟡 Image Picker Result:", result); // ✅ Check what the user picked

		if (!result.canceled) {
			console.log("✅ Selected Image URI:", result.assets[0].uri);
			setUser((prev) => ({ ...prev, image: result.assets[0].uri }));
		}
	};

	const imageSource = getUserImageSrc(user.image);

	const onSubmit = async () => {
		if (!currentUser?.id) {
			Alert.alert("Edit Profile", "User ID is missing.");
			return;
		}
		if (!user.name.trim()) {
			Alert.alert("Edit Profile", "Name cannot be empty.");
			return;
		}

		console.log("🚀 Submitting Profile Update..."); // just checking if the function runs
    	setLoading(true);

		let imageUrl = user.image; // default to current image

		// check if the user selected a new image
		if (user.image && user.image.startsWith('file://')) {

			const uploadResult = await uploadFile('profile_pictures', user.image, true);

			if (!uploadResult.success) {
				setLoading(false);
				Alert.alert("❌ Edit Profile", "Failed to upload image.");
				return;
			}

			// get new image url from supabase
			imageUrl = uploadResult.data ?? null; // we will use this to set new profile pic right the way
			console.log("🟢 Image URL from Supabase: ", imageUrl);
		}

		const updatedUserData = {
			...user,
			image: imageUrl,
		};

		console.log("🟡 Updated User Profile:", updatedUserData);

		const res = await updateUserService(currentUser.id, updatedUserData);
		setLoading(false);

		console.log("🟡 Supabase update response:", res); // check if the server responds correctly

		if (res.success) {
			updateUserData(updatedUserData); // make sure the profile page has the updated data right away
			console.log("🟢 Profile Updated Successfully!");
		} else {
			console.error("❌ Profile Update Failed:", res);
		}

		if (router.canGoBack()) {
			router.back();
		} else {
			router.push('/profile');
		}
	};

	return (
		<ScreenWrapper bg="white">
			<View style={styles.container}>
				<ScrollView style={{flex: 1}}>
					<Header
						title="Edit Profile"
						showBackButton={true}
					/>
					<View style={styles.form}>

						<View style={styles.avatarContainer}>
							<Avatar
								uri={imageSource}
								// style={styles.avatar}
								size={hp(12)}
							/>
							<Pressable onPress={onPickImage}>
								<CameraIcon style={styles.cameraIcon} />
							</Pressable>
						</View>

						<Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
							Please fill your profile details
						</Text>
						{/* Edit Name */}
						<Input
							icon={<UserIcon />}
							placeholder="Enter your name"
							value={user.name}
							onChangeText={(value) => setUser((prev) => ({ ...prev, name: value }))}
						/>
						{/* Edit Phone */}
						<Input
							icon={<PhoneIcon />}
							placeholder="Enter your phone number"
							value={user.phoneNumber}
							onChangeText={(value) => setUser((prev) => ({ ...prev, phoneNumber: value }))}
						/>
						{/* Edit Address */}
						<Input
							icon={<AddressIcon />}
							placeholder="Enter your address"
							value={user.address}
							onChangeText={(value) => setUser((prev) => ({ ...prev, address: value }))}
						/>
						{/* Edit Bio */}
						<Input
							icon={<BookOpenIcon />}
							placeholder="Enter your bio"
							value={user.bio}
							multiline={true}
							containerStyle={styles.bio}
							onChangeText={(value) => setUser((prev) => ({ ...prev, bio: value }))}
						/>

						<Button title="Update" loading={loading} onPress={onSubmit} disabled={loading} />

					</View>
				</ScrollView>
			</View>
		</ScreenWrapper>
	)
}

export default editProfile

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(4),
	},
	form: {
		gap: 18,
		marginTop: 20,
	},
	avatarContainer: {
		height: hp(12),
		width: hp(12),
		alignSelf: 'center',
	},
	avatar: {
		width: '100%',
		height: '100%',
		borderRadius: theme.radius.xxl*1.8,
		borderCurve: 'continuous',
		borderWidth: 1,
		borderColor: theme.colors.darkLight,
	},
	cameraIcon: {
		position: 'absolute',
		bottom: 0,
		right: 5,
		padding: 8,
		borderRadius: 50,
		backgroundColor: 'white',
		shadowColor: theme.colors.textLight,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.4,
		shadowRadius: 5,
		elevation: 7,
	},
	input: {
		flexDirection: 'row',
		borderWidth: 0.4,
		borderColor: theme.colors.text,
		borderRadius: theme.radius.xxl,
		borderCurve: 'continuous',
		padding: 17,
		paddingHorizontal: 20,
		gap: 15,
	},
	bio: {
		flexDirection: 'row',
		height: hp(15),
		alignItems: 'flex-start',
		paddingVertical: 15,
	}
})




