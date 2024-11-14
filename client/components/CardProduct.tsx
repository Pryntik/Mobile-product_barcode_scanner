import lessIcon from "../assets/img/less.png";
import moreIcon from "../assets/img/more.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleProp, ViewStyle } from "react-native";
import { ProductCardType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { getProductIcon, getProductPrice, getProductQuantity, parsePrice, parseQuantity } from "../utils/item.util";

type CardModeType = 'popup' | 'basket' | 'history';

type CardProductType = {
    product: ProductCardType,
    getCardPrice?: (price: number) => void,
    getCardQuantity?: (quantity: number) => void,
    mode?: CardModeType,
    style?: StyleProp<ViewStyle>,
}

const CardProduct = ({
    product,
    getCardPrice,
    getCardQuantity,
    mode = 'popup',
    style = {
        position: 'static',
    },
}: CardProductType) => {
    const [cardQuantity, setCardQuantity] = useState(getProductQuantity(product));
    const [cardPrice, setCardPrice] = useState(cardQuantity * getProductPrice(product));

    const changeQuantity = (value: number | string) => {
        const newQuantity = parseInt(parseQuantity(cardQuantity, value));
        setCardQuantity(newQuantity);
        getCardQuantity && getCardQuantity(newQuantity);
    }

    const upQuantity = () => changeQuantity(1);
    const downQuantity = () => changeQuantity(-1);

    const CardProductViewMode = () => {
        return (
            <View style={[cardStyle.container, style]}>
                <View style={cardStyle.data}>
                    <Image style={cardStyle.icon} source={getProductIcon(product)}/>
                    <Text style={cardStyle.title}>{product.name}</Text>
                    <View style={cardStyle.otherData}>
                        <View style={cardStyle.otherDataTop}>
                            <Text style={cardStyle.content}>{parsePrice(cardPrice, '€')}</Text>
                            <Image style={cardStyle.status} source={product.statusIcon}/>
                        </View>
                        <View style={cardStyle.otherDataBottom}>
                            <ImageButton
                                style={{image: cardStyle.buttonQuantity}}
                                src={lessIcon} onClick={downQuantity}
                                disableDefaultStyle/>
                            <TextInput
                                style={cardStyle.content}
                                keyboardType="numeric"
                                value={cardQuantity.toString()}
                                onChangeText={text => changeQuantity(text)}/>
                            <ImageButton
                                style={{image: cardStyle.buttonQuantity}}
                                src={moreIcon} onClick={upQuantity}
                                disableDefaultStyle/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    useEffect(() => {
        setCardQuantity(getProductQuantity(product));
        setCardPrice(getProductPrice(product));
    }, [product]);

    useEffect(() => {
        setCardPrice(cardQuantity * getProductPrice(product));
    }, [cardQuantity]);

    useEffect(() => {
        getCardQuantity && getCardQuantity(cardQuantity);
        getCardPrice && getCardPrice(cardPrice);
    }, [cardQuantity, cardPrice]);

    return <CardProductViewMode/>
}

export default CardProduct;