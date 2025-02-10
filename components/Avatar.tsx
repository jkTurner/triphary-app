import { StyleProp, StyleSheet } from 'react-native'
import React from 'react'
import { Image, ImageStyle } from 'expo-image';
import { theme } from '@/constants/theme';
import { getUserMediaSrc } from '@/services/imageService';

interface AvatarProps {
	uri?: string;
	size?: number;
	style?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<AvatarProps> = ({
	uri,
	size = 24,
	style,
}) => {

	// const source = uri ? { uri } : require('@/assets/images/profile-default.jpg');
	const source = uri ? (typeof uri === "string" ? { uri } : uri) : require('@/assets/images/profile-default.jpg');

	return (
		<Image
			source={getUserMediaSrc(uri)}
			// source={uri}
			transition={100}
			style={[styles.avatar, {height: size, width: size, borderRadius: size / 2 }, style]}
		/>
  	);
};

export default Avatar

const styles = StyleSheet.create({
	avatar: {
		borderCurve: 'continuous',
		borderColor: theme.colors.darkLight,
		borderWidth: 1,
	},
});



