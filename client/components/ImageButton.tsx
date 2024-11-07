import React, { useState } from "react";
import { Pressable, Text, Image, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, TextStyle, Button, View, ColorValue } from "react-native";
import { buttonStyle } from "../styles/Button.style";

type ImageButtonType = {
    onClick: () => void,
    disableDefaultStyle?: boolean,
    text?: string,
    alt?: string,
    src?: ImageSourcePropType,
    colorButton?: ColorValue,
    clickColorButton?: ColorValue,
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
    clickColorButton = '#f0f0f0',
    styleView,
    styleButton,
    styleText,
    styleImage,
}: ImageButtonType) => {
    const [isClicked, setIsClicked] = useState(false);

    const stylesView: StyleProp<ViewStyle>[] = [styleView, buttonStyle.imageButton_view]
    const stylesButton: StyleProp<ViewStyle>[] = [styleView, buttonStyle.imageButton_button, {borderColor: colorButton}]
    const stylesText: StyleProp<TextStyle>[] = [styleText, buttonStyle.imageButton_text]
    const stylesImage: StyleProp<ImageStyle>[] = [styleImage, buttonStyle.imageButton_image]

    const sView = disableDefaultStyle ? styleView : stylesView;
    const sButton = disableDefaultStyle ? styleButton : stylesButton;
    const sText = disableDefaultStyle ? styleText : stylesText;
    const sImage = disableDefaultStyle ? styleImage : stylesImage;

    const handleClick = async () => {
        setIsClicked(true);
        onClick();
        await new Promise(r => setTimeout(r, 200));
        setIsClicked(false);
    };

    const viewImageButtonMode = () => {
        if (text && (src || alt)) {
            return (
            <Pressable onPress={handleClick}>
                <View style={[sButton, {backgroundColor: isClicked ? clickColorButton : 'white'}]}>
                    <Text style={sText}>{text}</Text>
                    <Image style={sImage} source={src} alt={alt}/>
                </View>
            </Pressable>
            )
        }
        if (text) {
            return (
                <View style={[sButton, {backgroundColor: isClicked ? clickColorButton : 'white'}]}>
                    <Button color={colorButton} title={text} onPress={handleClick}/>
                </View>
            );
        }
        if (src || alt) {
            return (
                
                <Pressable style={[sButton, {backgroundColor: isClicked ? clickColorButton : 'white'}]} onPress={handleClick}>
                    <Image style={sImage} source={src} alt={alt}/>
                </Pressable>
            );
        }
        return (
            <Button color={colorButton} title="Button" onPress={handleClick}></Button>
        );
    }

    return (
        <View style={sView}>
            {viewImageButtonMode()}
        </View>
    );
};

export default ImageButton;