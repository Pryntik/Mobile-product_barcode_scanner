import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import Constants from 'expo-constants';
import { Button, SafeAreaView, Text } from "react-native";
import CheckoutScreen from "./CheckoutScreen";

export default function PagePanier() {
  const stripePK = Constants?.expoConfig?.extra?.stripePK;

    return (
        <SafeAreaView>
            <Text>Page Panier</Text>
            <StripeProvider
                publishableKey={stripePK}
                merchantIdentifier="merchant.com.example"
            >
                <CheckoutScreen />
            </StripeProvider>
        </SafeAreaView>
    );
}