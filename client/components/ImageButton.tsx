import React, { useState } from "react";
import { Pressable, Text, Image, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, TextStyle, Button, View, ColorValue } from "react-native";
import { buttonStyle } from "../styles/Button.style";

type ColorButtonType = {
    color?: ColorValue,
    backgroundColor?: ColorValue,
    clickColor?: ColorValue,
    disabledColor?: ColorValue,
}

type ImageButtonType = {
    onClick: () => void,
    disableDefaultStyle?: boolean,
    disableButton?: boolean,
    text?: string,
    alt?: string,
    src?: ImageSourcePropType,
    colorButton?: ColorButtonType,
    styleView?: StyleProp<ViewStyle>,
    styleButton?: StyleProp<ViewStyle>,
    styleText?: StyleProp<TextStyle>,
    styleImage?: StyleProp<ImageStyle>,
}

const ImageButton = ({
    onClick,
    disableDefaultStyle,
    disableButton,
    text,
    alt,
    src,
    colorButton = {
        color: 'black',
        backgroundColor: 'white',
        clickColor: '#f0f0f0',
        disabledColor: '#dfdfdf',
    },
    styleView,
    styleButton,
    styleText,
    styleImage,
}: ImageButtonType) => {
    const [isClicked, setIsClicked] = useState(false);

    const stylesView: StyleProp<ViewStyle>[] = [styleView, buttonStyle.imageButton_view]
    const stylesButton: StyleProp<ViewStyle>[] = [styleView, buttonStyle.imageButton_button, {borderColor: colorButton.color}]
    const stylesText: StyleProp<TextStyle>[] = [styleText, buttonStyle.imageButton_text]
    const stylesImage: StyleProp<ImageStyle>[] = [styleImage, buttonStyle.imageButton_image]

    const sView = disableDefaultStyle ? styleView : stylesView;
    const sButton = disableDefaultStyle ? styleButton : stylesButton;
    const sText = disableDefaultStyle ? styleText : stylesText;
    const sImage = disableDefaultStyle ? styleImage : stylesImage;

    const otherButtonStyle = () => {
        if (disableButton) return {backgroundColor: colorButton.disabledColor};
        if (isClicked) return {backgroundColor: colorButton.clickColor};
        return {backgroundColor: colorButton.backgroundColor};
    }

    const handleClick = async () => {
        if (!disableButton) {
            setIsClicked(true);
            onClick();
            await new Promise(r => setTimeout(r, 200));
            setIsClicked(false);
        }
    };

    const viewImageButtonMode = () => {
        if (text && (src || alt)) {
            return (
            <Pressable onPress={handleClick}>
                <View style={[sButton, otherButtonStyle()]}>
                    <Text style={sText}>{text}</Text>
                    <Image style={sImage} source={src} alt={alt}/>
                </View>
            </Pressable>
            )
        }
        if (text) {
            return (
                <View style={[sButton, otherButtonStyle()]}>
                    <Button color={colorButton.color} title={text} onPress={handleClick} disabled={disableButton}/>
                </View>
            );
        }
        if (src || alt) {
            return (
                <Pressable style={[sButton, otherButtonStyle()]} onPress={handleClick}>
                    <Image style={sImage} source={src} alt={alt}/>
                </Pressable>
            );
        }
        return (
            <Button color={colorButton.color} title="Button" onPress={handleClick} disabled={disableButton}></Button>
        );
    }

    return (
        <View style={sView}>
            {viewImageButtonMode()}
        </View>
    );
};

export default ImageButton;