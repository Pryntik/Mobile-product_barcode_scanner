import React, { useState } from "react";
import { Pressable, Text, Image, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, TextStyle, Button, View, ColorValue } from "react-native";
import { buttonStyle } from "../styles/Button.style";

type ColorImageButtonType = {
    color?: ColorValue,
    backgroundColor?: ColorValue,
    clickColor?: ColorValue,
    disabledColor?: ColorValue,
}

type StyleImageButtonType = {
    view?: StyleProp<ViewStyle>,
    button?: StyleProp<ViewStyle>,
    text?: StyleProp<TextStyle>,
    image?: StyleProp<ImageStyle>,
}

type ImageButtonType = {
    onClick: () => void,
    disableDefaultStyle?: boolean,
    disableButton?: boolean,
    text?: string,
    alt?: string,
    src?: ImageSourcePropType,
    style: StyleImageButtonType,
    colorButton?: ColorImageButtonType,
}

const ImageButton = ({
    onClick,
    disableDefaultStyle,
    disableButton,
    text,
    alt,
    src,
   style,    
    colorButton = {
        color: 'black',
        backgroundColor: 'white',
        clickColor: '#f0f0f0',
        disabledColor: '#dfdfdf',
    },
}: ImageButtonType) => {
    const [isClicked, setIsClicked] = useState(false);

    const stylesView: StyleProp<ViewStyle>[] = [style.view, buttonStyle.imageButton_view]
    const stylesButton: StyleProp<ViewStyle>[] = [style.view, buttonStyle.imageButton_button, {borderColor: colorButton.color}]
    const stylesText: StyleProp<TextStyle>[] = [style.text, buttonStyle.imageButton_text]
    const stylesImage: StyleProp<ImageStyle>[] = [style.image, buttonStyle.imageButton_image]

    const sView = disableDefaultStyle ? style.view : stylesView;
    const sButton = disableDefaultStyle ? style.button : stylesButton;
    const sText = disableDefaultStyle ? style.text : stylesText;
    const sImage = disableDefaultStyle ? style.image : stylesImage;

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