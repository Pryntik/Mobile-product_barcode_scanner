import emptyBasketIcon from "../assets/img/basket_empty.png";
import Checkout from "../components/Checkout";
import CardProduct from "../components/CardProduct";
import ImageButton from "../components/ImageButton";
import EmptyBasket from "../components/EmptyBasket";
import ManualProduct from "../components/ManualProduct";
import React, { useState, useCallback, ReactElement, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { ProductSaveType } from "../types/TItem";
import { getProductCard, isValidProductStatus } from "../utils/item.util";
import { useFocusEffect } from '@react-navigation/native';
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";

const Basket = () => {
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
                <View style={basketStyle.buttons_view}>
                    <EmptyBasket/>
                    <Checkout />
                    <ManualProduct/>
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
        const products = await getAllProductsDB();
        const updatedCardProducts: ReactElement[] = [];

        for (const product of products) {
            const productCard = await getProductCard(product);
            if (isValidProductStatus(productCard)) {
                updatedCardProducts.push(
                    <CardProduct key={product.id} product={productCard} style={{ marginTop: 20 }} />
                );
            }
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