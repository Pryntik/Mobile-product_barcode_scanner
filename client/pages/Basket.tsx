import emptyBasketIcon from "../assets/img/basket_empty.png";
import CheckoutScreen from "../components/CheckoutScreen";
import CardProduct from "../components/CardProduct";
import ImageButton from "../components/ImageButton";
import Constants from 'expo-constants';
import React, { useState, useCallback, ReactElement, useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ToastAndroid, View, Text } from "react-native";
import { ProductType } from "../types/TItem";
import { getProductCard } from "../utils/item.util";
import { useFocusEffect } from '@react-navigation/native';
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";

const Basket = () => {
    const stripePK = Constants?.expoConfig?.extra?.stripePK;
    const [items, setItems] = useState<ProductType[]>([]);
    const [cardProducts, setCardProducts] = useState<ReactElement[]>([]);

    const getCardProducts = () => {
        return cardProducts.map(cardProduct => cardProduct);
    }

    const basketViewMode = () => {
        if (items.length > 0) {
        return (
            <>
                <View>
                    {getCardProducts()}
                </View>
                <View>
                    <StripeProvider publishableKey={stripePK} merchantIdentifier="univ.com.barcodescanner" children={
                        <CheckoutScreen />
                    }/>
                </View>
            </>
        );
        }
        return (
            <View style={basketStyle.empty_view}>
                <ImageButton
                    src={emptyBasketIcon}
                    onClick={majDB}
                    styleImage={basketStyle.empty_image}
                    disableDefaultStyle/>
                <Text style={basketStyle.empty_text}>Empty</Text>
            </View>
        );
    }

    const majDB = async () => {
        const products = await getAllProductsDB();
        setItems(products);
        ToastAndroid.show(`Basket updated: items length ${items.length}`, ToastAndroid.SHORT);
    }
  
    useEffect(() => {
        items.map(async (item, i) => {
            const productCard = await getProductCard(item);
            setCardProducts(prevCardProducts => [...prevCardProducts, <CardProduct key={i} product={productCard} />]);
        });
    }, [items]);

    useFocusEffect(
        useCallback(() => {
            getAllProductsDB().then(products => {
                setItems(products);
                ToastAndroid.show(`Basket updated: items length ${items.length}`, ToastAndroid.SHORT);
            }).catch(error => {
                console.error('Error Basket useFocusEffect[]:', error);
            });
        }, [])
    );

    return (
        <View style={basketStyle.container}>
            {basketViewMode()}
        </View>
    );
};

export default Basket;