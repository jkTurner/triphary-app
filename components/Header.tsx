import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import { useRouter } from 'expo-router'
import { hp } from '@/helpers/common';
import { theme } from '@/constants/theme';

interface HeaderProps {
	title?: string;
	showBackButton?: boolean;
	mb?: number;
}

const Header: React.FC<HeaderProps> = ({
	title,
	showBackButton = false,
	mb = 10
}) => {

	const router = useRouter();

	return (
		<View style={[styles.container, {marginBottom: mb}]}>
			{
				showBackButton && (
					<View style={styles.backButton}>
						<BackButton router={router} />
					</View>
				)
			}
			<Text style={styles.title}>{title || ""}</Text>
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 5,
		// gap: 10,
		// backgroundColor: 'red',
	},
	backButton: {
		position: 'absolute',
		left: 0,
	},
	title: {
		fontSize: hp(2.7),
		fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
		color: theme.colors.textDark,
	}
})