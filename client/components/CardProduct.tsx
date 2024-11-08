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
    mode?: CardModeType,
    style?: StyleProp<ViewStyle>,
    getCardPrice?: (price: number) => void,
    getCardQuantity?: (quantity: number) => void,
}

const CardProduct = ({
    product,
    mode = 'popup',
    style = {
        position: 'static',
    },
    getCardPrice,
    getCardQuantity,
}: CardProductType) => {
    const [cardQuantity, setCardQuantity] = useState(getProductQuantity(product));
    const [cardPrice, setCardPrice] = useState(cardQuantity * getProductPrice(product));

    const changeQuantity = (value: number | string) => {
        setCardQuantity(parseInt(parseQuantity(cardQuantity, value)));
    }

    const CardProductViewMode = () => {
        if (mode === 'basket' && cardQuantity <= 0) {
            return <></>
        }
        else {
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
                                    styleImage={cardStyle.buttonQuantity}
                                    src={lessIcon} onClick={() => changeQuantity(-1)}
                                    disableDefaultStyle/>
                                <TextInput
                                    style={cardStyle.content}
                                    keyboardType="numeric"
                                    value={cardQuantity.toString()}
                                    onChangeText={text => changeQuantity(text)}/>
                                <ImageButton
                                    styleImage={cardStyle.buttonQuantity}
                                    src={moreIcon} onClick={() => changeQuantity(1)}
                                    disableDefaultStyle/>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
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
        <CardProductViewMode/>
    )
}

export default CardProduct;