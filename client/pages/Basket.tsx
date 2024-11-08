import emptyBasketIcon from "../assets/img/basket_empty.png";
import CheckoutButton from "../components/CheckoutButton";
import CardProduct from "../components/CardProduct";
import ImageButton from "../components/ImageButton";
import Constants from 'expo-constants';
import React, { useState, useCallback, ReactElement, useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { View, Text, ScrollView } from "react-native";
import { ProductSaveType } from "../types/TItem";
import { getProductCard, isValidProductStatus, stringifyProduct } from "../utils/item.util";
import { useFocusEffect } from '@react-navigation/native';
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";

const Basket = () => {
    const stripePK = Constants?.expoConfig?.extra?.stripePK;
    const [items, setItems] = useState<ProductSaveType[]>([]);
    const [cardProducts, setCardProducts] = useState<ReactElement[]>([]);

    const getCardProducts = () => cardProducts.map(cardProduct => cardProduct);

    const basketViewMode = () => {
        if (cardProducts.length > 0) {
        return (
            <>
                <ScrollView style={basketStyle.scroll_view}>
                    {getCardProducts()}
                </ScrollView>
                <View>
                    <StripeProvider publishableKey={stripePK} merchantIdentifier="univ.com.barcodescanner" children={
                        <CheckoutButton />
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
    }
  
useEffect(() => {
    const updateCardProducts = async () => {
        let key = 0;
        const products = await getAllProductsDB();
        const updatedCardProducts: ReactElement[] = [];

        for (const product of products) {
            const productCard = await getProductCard(product);
            if (isValidProductStatus(productCard)) {
                updatedCardProducts.push(
                    <CardProduct key={key} product={productCard} style={{ marginTop: 20 }} />
                );
            }
            key++;
        }
        setItems(products);
        setCardProducts(updatedCardProducts);
    };

    updateCardProducts();
}, [items]);


    useFocusEffect(
        useCallback(() => {
            majDB();
        }, [])
    );

    return (
        <View style={basketStyle.container}>
            {basketViewMode()}
        </View>
    );
};

export default Basket;