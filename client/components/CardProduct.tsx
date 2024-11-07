import lessIcon from "../assets/img/less.png";
import moreIcon from "../assets/img/more.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { ProductCardType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { FlexStyle } from "react-native";
import { getProductIcon, getProductIconStatus, getProductName, getProductPrice, getProductQuantity, isProduct, parsePrice, parseQuantity } from "../utils/item.util";

type CardProductType = {
    product: ProductCardType,
    position?: FlexStyle['position'],
    getCardPrice?: (price: number) => void,
    getCardQuantity?: (quantity: number) => void,
}

const CardProduct = ({
    product,
    position = 'static',
    getCardPrice,
    getCardQuantity,
}: CardProductType) => {
    const [cardQuantity, setCardQuantity] = useState(getProductQuantity(product));
    const [cardPrice, setCardPrice] = useState(getProductPrice(product));

    const changeQuantity = (value: number | NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCardQuantity(parseInt(parseQuantity(cardQuantity, value)));
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

    return (
        <View style={[cardStyle.container, {position: position}]}>
            <View style={cardStyle.data}>
                <Image style={cardStyle.icon} source={getProductIcon(product)}/>
                <Text style={cardStyle.title}>{product.name}</Text>
                <View style={cardStyle.otherData}>
                    <View style={cardStyle.otherDataTop}>
                        <Text style={cardStyle.content}>{parsePrice(cardPrice, '€') /* = 0.00€ */}</Text>
                        <Image style={cardStyle.status} source={product.statusIcon}/>
                    </View>
                    <View style={cardStyle.otherDataBottom}>
                        <ImageButton
                            styleImage={cardStyle.buttonQuantity}
                            src={lessIcon} onClick={() => changeQuantity(-1)}
                            disableDefaultStyle={true}/>
                        <TextInput
                            style={cardStyle.content}
                            keyboardType="numeric"
                            value={cardQuantity.toString()}
                            onChange={changeQuantity}/>
                        <ImageButton
                            styleImage={cardStyle.buttonQuantity}
                            src={moreIcon} onClick={() => changeQuantity(1)}
                            disableDefaultStyle={true}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CardProduct;