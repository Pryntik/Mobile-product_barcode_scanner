import emptyHistoryIcon from "../assets/img/history_empty.png";
import ImageButton from "../components/ImageButton";
import CardProduct from "../components/CardProduct";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { ProductType } from "../types/TItem";
import { getAllProductsAPI } from "../services/api";
import { historyStyle } from "../styles/History.style";
import { getProductCard } from "../utils/item.util";
import { toast } from "../utils/log.util";

const History = () => {
    const [items, setItems] = useState<ProductType[]>([]);
    const [cardProducts, setCardProducts] = useState<ReactElement[]>([]);

    const getCardProducts = () => {
        return cardProducts.map(cardProduct => cardProduct);
    }

    const historyViewMode = () => {
        if (items.length > 0) {
        return (
            <View>
                {getCardProducts()}
            </View>
        );
        }
        return (
            <View style={historyStyle.empty_view}>
                <ImageButton
                    src={emptyHistoryIcon}
                    onClick={majAPI}
                    style={{image: historyStyle.empty_image}}
                    disableDefaultStyle/>
                <Text style={historyStyle.empty_text}>Empty</Text>
            </View>
        );
    }

    const majAPI = async () => {
        const products = await getAllProductsAPI();
        setItems(products.data);
        toast(`History updated: items length ${items.length}`);
    }

    useEffect(() => {
        items.map(async (item, i) => {
            const productCard = await getProductCard(item);
            setCardProducts(prevCardProducts => [...prevCardProducts, <CardProduct key={i} product={productCard} />]);
        });
    }, [items]);

    useFocusEffect(
        useCallback(() => {
            majAPI();
        }, [])
    );

    return (
        <View style={historyStyle.container}>
            {historyViewMode()}
        </View>
    );
}

export default History;