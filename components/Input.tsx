import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';

interface InputProps {
	containerStyle?: StyleProp<ViewStyle>;
	inputRef?: React.Ref<TextInput>;
	icon?: React.ReactNode;
	placeholder?: string;
	secureTextEntry?: boolean;
	value?: string;
	multiline?: boolean;
	onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
	<View style={[styles.container, props.containerStyle && props.containerStyle]}>
		{
			// props.icon && props.icon
			props.icon && (
				<View style={[props.multiline && styles.iconMultiline]}>
					{props.icon}
				</View>
			)
		}
		<TextInput
			style={[styles.textInput, {flex: 1}]}
			placeholderTextColor={theme.colors.dark}
			ref={props.inputRef || undefined }
			{...props}
	  	/>
	</View>
  )
}

export default Input

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.inputBackground,
		flexDirection: 'row',
		height: hp(7.2),
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 0.4,
		borderColor: theme.colors.inputBorder,
		borderRadius: theme.radius.xxl,
		borderCurve: 'continuous',
		paddingHorizontal: 18,
		gap: 12,
	},
	textInput: {
		margin: 0,
		padding: 0,
		textAlignVertical: 'top',
	},
	iconMultiline: {
		// marginTop: 10,
	}
})

