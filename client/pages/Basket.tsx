import emptyBasketIcon from "../assets/img/basket_empty.png";
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
import { getProductCard, isValidProductToSave } from "../utils/item.util";
import { useFocusEffect } from '@react-navigation/native';

const Basket = () => {
    const [cardProducts, setCardProducts] = useState<ProductCardType[]>([]);
    const [basketIsEmpty, setBasketIsEmpty] = useState(true);
    const [buttonEmptyBasketIsClick, setButtonEmptyBasketIsClick] = useState(false);
    const [buttonCheckoutIsClick, setButtonCheckoutIsClick] = useState(false);
    const [buttonManualIsClick, setButtonManualIsClick] = useState(false);
    
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
                    <ScrollView style={basketStyle.scroll_view}>
                        {getCardProducts()}
                    </ScrollView>
                    <View style={basketStyle.buttons_view}>
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
            <View style={basketStyle.empty_view}>
                <ImageButton
                    src={emptyBasketIcon}
                    onClick={updateProducts}
                    style={{image: basketStyle.empty_image}}
                    disableDefaultStyle/>
                <Text style={basketStyle.empty_text}>Empty</Text>
                <View style={basketStyle.buttons_view}>
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
        setBasketIsEmpty(products.length === 0);
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
                data={{type: 'form'}}
                style={{view: basketStyle.manual_view}}/>
        </View>
    );
};

export default Basket;