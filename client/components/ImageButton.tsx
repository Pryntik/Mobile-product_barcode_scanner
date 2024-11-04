import React from "react";
import { Pressable, Image, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle } from "react-native";

type ImageButtonType = {
    onClick: () => void,
    alt?: string,
    src?: ImageSourcePropType,
    styleView?: StyleProp<ViewStyle>,
    styleImage?: StyleProp<ImageStyle>,
}

const ImageButton = ({
    alt,
    onClick,
    src,
    styleView,
    styleImage,
}: ImageButtonType) => {
    return (
        <Pressable style={styleView} onPress={onClick}>
            <Image style={styleImage} source={src} alt={alt}/>
        </Pressable>
    )
};

export default ImageButton;