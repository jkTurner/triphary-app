import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import Loading from './Loading';

interface ButtonProps {
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    title?: string;
    onPress?: () => void;
    loading?: boolean;
	disabled?: boolean;
    hasShadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    buttonStyle,
    textStyle,
    title='',
    onPress=()=>{},
    loading = false,
	disabled = false,
    hasShadow = false,
}) => {

    const shadowStyle = {
      shadowColor: theme.colors.dark,
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    }

    if(loading) {
      return (
        <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
          <Loading />
        </View>
      )
    }

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        paddingHorizontal: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius.xl,
        // borderCurve: 'continuous', (this is maybe iOS?)
    },
    text: {
        color: theme.colors.textButton,
        fontWeight: theme.fonts.medium as TextStyle['fontWeight'],
        fontSize: hp(1.8),
    }
})