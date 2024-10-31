import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import Constants from 'expo-constants';
import { SafeAreaView, Text } from "react-native";
import CheckoutScreen from "../components/CheckoutScreen";

const Panier = () => {
  const stripePK = Constants?.expoConfig?.extra?.stripePK;

    return (
        <SafeAreaView>
            <StripeProvider publishableKey={stripePK} merchantIdentifier="merchant.com.example">
                <CheckoutScreen />
            </StripeProvider>
        </SafeAreaView>
    );
}

export default Panier;