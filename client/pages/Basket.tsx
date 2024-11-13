import emptyBasketIcon from "../assets/img/basket_empty.png";
import Checkout from "../components/Checkout";
import CardProduct from "../components/CardProduct";
import ImageButton from "../components/ImageButton";
import EmptyBasket from "../components/EmptyBasket";
import ManualProduct from "../components/ManualProduct";
import Popup from "../components/Popup";
import React, { useState, ReactElement, useCallback, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { ProductSaveType } from "../types/TItem";
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";
import { getProductCard, isValidProductStatus } from "../utils/item.util";
import { useFocusEffect } from '@react-navigation/native';

const Basket = () => {
    const [items, setItems] = useState<ProductSaveType[]>([]);
    const [cardProducts, setCardProducts] = useState<ReactElement[]>([]);
    const [showManualProduct, setShowManualProduct] = useState(false);

    const getCardProducts = () => cardProducts.map(cardProduct => cardProduct);

    const popupIsClose = (isClose: boolean) => {
        if (isClose === true) setShowManualProduct(false);
    }

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
                        <ManualProduct
                            getClick={(isClick) => setShowManualProduct(isClick)}
                            setClick={showManualProduct}/>
                    </View>
                </>
            );
        }
        return (
            <View style={basketStyle.empty_view}>
                <ImageButton
                    src={emptyBasketIcon}
                    onClick={updateDB}
                    style={{image: basketStyle.empty_image}}
                    disableDefaultStyle/>
                <Text style={basketStyle.empty_text}>Empty</Text>
                <View style={basketStyle.buttons_view}>
                    <ManualProduct
                        getClick={(isClick) => setShowManualProduct(isClick)}
                        setClick={showManualProduct}/>
                </View>
            </View>
        );
    }

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

    const updateDB = async () => {
        const products = await getAllProductsDB();
        setItems(products);
    }
  
    useEffect(() => {
        updateCardProducts();
    }, [items]);

    useFocusEffect(
        useCallback(() => {
            updateDB();
        }, [])
    );

    return (
        <View style={basketStyle.container}>
            {basketViewMode()}
            <Popup
                isVisible={showManualProduct}
                isClosed={popupIsClose}
                data={{type: 'form'}}
                style={{view: basketStyle.manual_view}}/>
        </View>
    );
};

export default Basket;