import CheckoutScreen from "../components/CheckoutScreen";
import CardProduct from "../components/CardProduct";
import Constants from 'expo-constants';
import React, { useState, useCallback, ReactElement, useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Button, View } from "react-native";
import { ProductType } from "../types/TItem";
import { getProductCard } from "../utils/item.util";
import { useFocusEffect } from '@react-navigation/native';
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";
import { deleteProductAPI } from "../services/api";

const Basket = () => {
  const stripePK = Constants?.expoConfig?.extra?.stripePK;
  const [items, setItems] = useState<ProductType[]>([]);
  const [visualItems, setVisualItems] = useState<ReactElement[]>([]);
  
  useEffect(() => {
      items.map(async (item, i) => {
        const productCard = await getProductCard(item);
        setVisualItems(prevVisualItems => [...prevVisualItems, <CardProduct key={i} product={productCard} />]);
      });
  }, [items]);

  useFocusEffect(
    useCallback(() => {
      getAllProductsDB().then(products => {
        setItems(products);
      }).catch(error => {
        console.error('Error Basket useFocusEffect[]:', error);
      });
    }, [])
  );

  const deleteItem = (id: number) => {
    deleteProductAPI(id).then(() => {
      console.log(`Item with id ${id} deleted`);
    }).catch(error => {
      console.error('Error Basket deleteItem[]:', error);
    });
  }

  return (
    <View style={basketStyle.container}>
      <View>
        {visualItems}
      </View>
      <Button title="MAJ" onPress={() => deleteItem(1)} />
      <View>
        <StripeProvider publishableKey={stripePK} merchantIdentifier="merchant.com.example" children={
          <CheckoutScreen />
        }/>
      </View>
    </View>
  );
};

export default Basket;