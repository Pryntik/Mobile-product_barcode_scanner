import lessIcon from "../assets/img/less.png";
import moreIcon from "../assets/img/more.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleProp, ViewStyle } from "react-native";
import { ProductCardType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { getProductIcon, getProductPriceFromQuantity, getProductQuantity, getProductSaveFromCard, parsePrice, parseQuantity } from "../utils/item.util";
import { addInitialProductDB, deleteProductDB, updateProductDB } from "../services/db";

type CardModeType = 'popup' | 'basket';

type CardProductType = {
    product: ProductCardType,
    getCardProduct?(cardProduct: ProductCardType): void,
    mode?: CardModeType,
    style?: StyleProp<ViewStyle>,
}

const CardProduct = ({
    mode = 'popup',
    product,
    getCardProduct,
    style,
}: CardProductType) => {
    const [cardProduct, setCardProduct] = useState(product);
    const [productIsDelete, setProductIsDelete] = useState(false);

    const changeQuantity = async (value: number | string) => {
        const newQuantity = parseInt(parseQuantity(cardProduct.quantity, value, mode === 'popup'));
        const newPrice = await getProductPriceFromQuantity(cardProduct, newQuantity, mode === 'popup');
    
        const updateCardProduct = {
            ...cardProduct,
            price: newPrice,
            quantity: newQuantity,
        };
        setCardProduct(updateCardProduct);
        getCardProduct && getCardProduct(updateCardProduct);

        if (mode === 'basket') {
            const updateSaveProduct = await getProductSaveFromCard(updateCardProduct);
            if (updateSaveProduct.quantity <= 0) {
                await deleteProductDB(updateSaveProduct.id);
                setProductIsDelete(true);
            }
            else {
                await updateProductDB(updateSaveProduct);
                setProductIsDelete(false);
            }
        }
    }

    const upQuantity = () => changeQuantity(1);
    const downQuantity = () => changeQuantity(-1);

    const CardProductViewMode = () => {
        if (productIsDelete) return <></>;
        return (
            <View style={[cardStyle.container, style]}>
                <View style={cardStyle.data}>
                    <View style={cardStyle.firstData_product}>
                        <Image style={cardStyle.icon} source={getProductIcon(cardProduct)}/>
                        <Text style={cardStyle.title}>{cardProduct.name}</Text>
                    </View>
                    <View style={cardStyle.otherData_product}>
                        <View style={cardStyle.otherDataTop_product}>
                            <Text style={cardStyle.content}>{parsePrice(cardProduct.price, '€')}</Text>
                            <Image style={cardStyle.status} source={cardProduct.statusIcon}/>
                        </View>
                        <View style={cardStyle.otherDataBottom_product}>
                            <ImageButton
                                style={{image: cardStyle.buttonQuantity}}
                                src={lessIcon}
                                onClick={downQuantity}
                                disableDefaultStyle/>
                            <TextInput
                                style={cardStyle.content}
                                keyboardType="numeric"
                                value={getProductQuantity(cardProduct, mode === 'popup').toString()}
                                onChangeText={text => changeQuantity(text)}/>
                            <ImageButton
                                style={{image: cardStyle.buttonQuantity}}
                                src={moreIcon}
                                onClick={upQuantity}
                                disableDefaultStyle/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    const updateInitialProduct = async () => {
        const { name, price } = product;
        if (name && price) await addInitialProductDB({name, price}, false);
    }

    useEffect(() => {
        updateInitialProduct();
        setCardProduct(product);
        getCardProduct && getCardProduct(product);
    }, [product]);

    return <CardProductViewMode />
}

export default CardProduct;