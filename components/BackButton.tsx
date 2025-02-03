import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { LeftArrow } from '@/assets/icons/Icons'
import { Router } from "expo-router"
import { theme } from '@/constants/theme';

interface BackButtonProps {
	router: Router;
}

const BackButton: React.FC<BackButtonProps> = ({ router }) => {

	return (

		<Pressable onPress={() => router.back()}
			style={styles.button}
		>
			<LeftArrow color="#5C5C5C" strokeWidth={2} />
			{/* <Text>BackButtons</Text> */}
		</Pressable>

	)
}

export default BackButton

const styles = StyleSheet.create({
	button: {
		alignSelf: 'flex-start',
		padding: 5,
		borderRadius: theme.radius.sm,
		backgroundColor: '#CFCFCF',
	}
})