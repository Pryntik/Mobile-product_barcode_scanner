import emptyBasketIcon from "../assets/img/basket_empty.png";
import emptyBasketDarkIcon from "../assets/img/basket_empty_dark.png";
import Checkout from "../components/Checkout";
import CardProduct from "../components/CardProduct";
import ImageButton from "../components/ImageButton";
import EmptyBasket from "../components/EmptyBasket";
import ManualProduct from "../components/ManualProduct";
import Popup from "../components/Popup";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { ProductCardType } from "../types/TItem";
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";
import { getProductCard, getTotalPrice, isValidProductToSave, parsePrice } from "../utils/item.util";
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { ThemeType } from "../styles/Theme.style";

const Basket = () => {
    const [cardProducts, setCardProducts] = useState<ProductCardType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [basketIsEmpty, setBasketIsEmpty] = useState(true);
    const [buttonEmptyBasketIsClick, setButtonEmptyBasketIsClick] = useState(false);
    const [buttonCheckoutIsClick, setButtonCheckoutIsClick] = useState(false);
    const [buttonManualIsClick, setButtonManualIsClick] = useState(false);
    const theme = useTheme() as ThemeType;
    
    const popupIsClose = (isClose: boolean) => {
        setButtonManualIsClick(!isClose);
    }

    const emptyButtonIsClick = async (isClick: boolean) => {
        setButtonEmptyBasketIsClick(isClick);
        await updateProducts();
        setButtonEmptyBasketIsClick(false);
    }

    const checkoutButtonIsClick = async (isClick: boolean) => {
        setButtonCheckoutIsClick(isClick);
        await updateProducts();
        setButtonCheckoutIsClick(false);
    }

    const manualButtonIsClick = async (isClick: boolean) => {
        setButtonManualIsClick(isClick);
        await updateProducts();
    }

    const getCardProducts = () => {
        return cardProducts.map((cardProduct, i) => {
            return (
                <CardProduct
                    key={i}
                    product={cardProduct}
                    mode='basket'
                    style={basketStyle.card}
                />
            )}
        );
    }

    const basketViewMode = () => {
        if (basketIsEmpty === false) {
            return (
                <>
                    <ScrollView style={[basketStyle.scroll_view, {backgroundColor: theme.colors.background}]}>
                        {getCardProducts()}
                    </ScrollView>
                    <View style={[basketStyle.total_view, {backgroundColor: theme.colors.background}]}>
                        <Text style={[basketStyle.total_text, {color: theme.colors.text}]}>
                            {`Total : ${parsePrice(totalPrice, '€')}`}
                        </Text>
                    </View>
                    <View style={[basketStyle.buttons_view, {backgroundColor: theme.colors.background}]}>
                        <EmptyBasket
                            getClick={emptyButtonIsClick}
                            setClick={buttonEmptyBasketIsClick}/>
                        <Checkout
                            getClick={checkoutButtonIsClick}
                            setClick={buttonCheckoutIsClick}/>
                        <ManualProduct
                            getClick={manualButtonIsClick}
                            setClick={buttonManualIsClick}/>
                    </View>
                </>
            );
        }
        return (
            <View style={[basketStyle.empty_view, {backgroundColor: theme.colors.background}]}>
                <ImageButton
                    src={theme.dark ? emptyBasketDarkIcon : emptyBasketIcon}
                    onClick={updateProducts}
                    style={{image: basketStyle.empty_image}}
                    disableDefaultStyle/>
                <Text style={basketStyle.empty_text}>Empty</Text>
                <View style={[basketStyle.buttons_view, {backgroundColor: theme.colors.background}]}>
                    <ManualProduct
                        getClick={manualButtonIsClick}
                        setClick={buttonManualIsClick}/>
                </View>
            </View>
        );
    }

    const updateProducts = async () => {
        const products = await getAllProductsDB();
        const updatedCardProducts = new Set<ProductCardType>();

        for (const product of products) {
            const productCard = await getProductCard(product);
            if (isValidProductToSave(productCard)) {
                updatedCardProducts.add(productCard);
            }
        };
        setCardProducts(Array.from(updatedCardProducts));
        setTotalPrice(getTotalPrice(products));
        setBasketIsEmpty(products.length <= 0);
    };

    useFocusEffect(
        useCallback(() => {
            updateProducts();
        }, [])
    );

    return (
        <View style={basketStyle.container}>
            {basketViewMode()}
            <Popup
                isVisible={buttonManualIsClick}
                isClosed={popupIsClose}
                data={{type: 'form'}}/>
        </View>
    );
};

export default Basket;