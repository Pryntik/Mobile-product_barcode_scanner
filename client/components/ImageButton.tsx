import React from "react";
import { Pressable, Text, Image, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, TextStyle, Button, View, ColorValue } from "react-native";
import { buttonStyle } from "../styles/Button.style";

type ImageButtonType = {
    onClick: () => void,
    disableDefaultStyle?: boolean,
    text?: string,
    alt?: string,
    src?: ImageSourcePropType,
    colorButton?: ColorValue,
    styleView?: StyleProp<ViewStyle>,
    styleButton?: StyleProp<ViewStyle>,
    styleText?: StyleProp<TextStyle>,
    styleImage?: StyleProp<ImageStyle>,
}

const ImageButton = ({
    onClick,
    disableDefaultStyle,
    text,
    alt,
    src,
    colorButton,
    styleView,
    styleButton,
    styleText,
    styleImage,
}: ImageButtonType) => {
    const stylesView: StyleProp<ViewStyle>[] = [styleView, buttonStyle.imageButton_view]
    const stylesButton: StyleProp<ViewStyle>[] = [styleView, buttonStyle.imageButton_button, {borderColor: colorButton}]
    const stylesText: StyleProp<TextStyle>[] = [styleText, buttonStyle.imageButton_text]
    const stylesImage: StyleProp<ImageStyle>[] = [styleImage, buttonStyle.imageButton_image]

    const sView = disableDefaultStyle ? styleView : stylesView;
    const sButton = disableDefaultStyle ? styleButton : stylesButton;
    const sText = disableDefaultStyle ? styleText : stylesText;
    const sImage = disableDefaultStyle ? styleImage : stylesImage;

    const viewImageButtonMode = () => {
        if (text && (src || alt)) {
            return (
            <Pressable onPress={onClick}>
                <View style={sButton}>
                    <Text style={sText}>{text}</Text>
                    <Image style={sImage} source={src} alt={alt}/>
                </View>
            </Pressable>
            )
        }
        if (text) {
            return (
                <Button color={colorButton} title={text} onPress={onClick}/>
            );
        }
        if (src || alt) {
            return (
                <Pressable onPress={onClick}>
                    <Image style={sImage} source={src} alt={alt}/>
                </Pressable>
            );
        }
        return (
            <Button color={colorButton} title="Button" onPress={onClick}></Button>
        );
    }

    return (
        <View style={sView}>
            {viewImageButtonMode()}
        </View>
    );
};

export default ImageButton;