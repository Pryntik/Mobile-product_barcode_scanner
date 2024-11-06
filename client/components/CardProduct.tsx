import React from "react";
import { View, Text, Image } from "react-native";
import { MaybeProductType, ProductCardType } from "../types/TItem";
import { getProductCard, getStatusIcon } from "../utils/item.util";
import { cardStyle } from "../styles/Card.style";

type CardProductType = {
    product: ProductCardType;
}

const CardProduct = ({product}: CardProductType) => {

    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.data}>
                <Image style={cardStyle.icon} source={product.icon}/>
                <Text style={cardStyle.title}>{product.name}</Text>
                <Text style={cardStyle.content}>{product.price}</Text>
                <Image style={cardStyle.status} source={product.statusIcon}/>
            </View>
        </View>
    );
}

export default CardProduct;