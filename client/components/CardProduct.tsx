import React, { useState } from "react";
import { View, Text } from "react-native";
import { popupStyle } from "../styles/Popup.style";
import { MaybeProductType, ProductType } from "../types/TItem";
import { isProduct } from "../utils/item.util";

type CardProductType = {
    mayProduct: MaybeProductType;
}

const CardProduct = ({mayProduct}: CardProductType) => {
    const [name, setName] = useState('Product unknown');
    const [price, setPrice] = useState('?€');
    const [itemIsProduct, setItemIsProduct] = useState('false');

    React.useEffect(() => {
        if (isProduct(mayProduct)) {
            const product = mayProduct as ProductType;
            setName(product.name);
            setPrice(product.price.toFixed(2) + '€');
            setItemIsProduct('true');
        }
    }, [mayProduct]);

    return (
        <View style={popupStyle.dataContainer}>
            <View style={popupStyle.dataCard}>
                <Text style={popupStyle.title}>{name}</Text>
                <Text style={popupStyle.content}>{price}</Text>
                <Text style={popupStyle.content}>{itemIsProduct}</Text>
            </View>
        </View>
    );
}

export default CardProduct;