import lessIcon from "../assets/img/less.png";
import moreIcon from "../assets/img/more.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleProp, ViewStyle } from "react-native";
import { ProductCardType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { getProductIcon, getProductPriceFromQuantity, getProductQuantity, getProductSaveFromCard, parsePrice, parseQuantity } from "../utils/item.util";
import { addInitialProductDB, deleteProductDB, updateProductDB } from "../services/db";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../styles/Theme.style";

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
    const theme = useTheme() as ThemeType;

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
                <View style={[cardStyle.data, {backgroundColor: theme.colors.background, borderColor: theme.colors.border}]}>
                    <View style={cardStyle.firstData_product}>
                        <Image style={cardStyle.icon} source={getProductIcon(cardProduct)}/>
                        <Text style={[cardStyle.title, {color: theme.colors.text}]}>{cardProduct.name}</Text>
                    </View>
                    <View style={cardStyle.otherData_product}>
                        <View style={cardStyle.otherDataTop_product}>
                            <Text style={[cardStyle.content, {color: theme.colors.text}]}>{parsePrice(cardProduct.price, '€')}</Text>
                            <Image style={cardStyle.status} source={cardProduct.statusIcon}/>
                        </View>
                        <View style={cardStyle.otherDataBottom_product}>
                            <ImageButton
                                alt='lessIcon'
                                src={lessIcon}
                                onClick={downQuantity}
                                style={{image: cardStyle.buttonQuantity_image}}
                                disableDefaultStyle/>
                            <TextInput
                                style={[cardStyle.content, {color: theme.colors.text}]}
                                keyboardType="numeric"
                                value={getProductQuantity(cardProduct, mode === 'popup').toString()}
                                onChangeText={text => changeQuantity(text)}/>
                            <ImageButton
                                alt='moreIcon'
                                src={moreIcon}
                                onClick={upQuantity}
                                style={{image: cardStyle.buttonQuantity_image}}
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