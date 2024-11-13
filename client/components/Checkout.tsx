import walletIcon from "../assets/img/wallet.png";
import ImageButton from "./ImageButton";
import React, { useState } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { Alert, ToastAndroid } from "react-native";
import { basketStyle } from "../styles/Basket.style";
import { apiUrl, userId } from "../services/api";
import { getAllProductsDB } from "../services/db";

const Checkout = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState<string>("");

    const fetchPaymentSheetParams = async () => {
        const products = await getAllProductsDB();
        const response = await fetch(`${apiUrl}/payments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pending_items": products,
                "customer_id": userId
            })
        });

        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        ToastAndroid.show('Initializing payment sheet', ToastAndroid.SHORT);
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: false,
        });

        if (!error) {
            setPaymentIntentId(paymentIntent);
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        await initializePaymentSheet();
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            const paymentIntent = `pi_${paymentIntentId.split("_")[1]}`;
            const response = await fetch(`${apiUrl}/payments/check/${paymentIntent}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "customer_id": userId
                })
            });

            if (response.status == 200) Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    return (
        <StripeProvider publishableKey={`${process.env.STRIPE_PK}`} merchantIdentifier="univ.com.barcodescanner">
            <ImageButton
                style={{
                    view: basketStyle.tabButton_view,
                    button: basketStyle.tabButton_button,
                    text: basketStyle.tabButton_text,
                    image: basketStyle.tabButton_image,
                }}
                colorButton={{backgroundColor: 'lightblue', clickColor: '#f0f0f0'}}
                text="Checkout"
                src={walletIcon}
                alt="Checkout"
                onClick={openPaymentSheet}
                disableButton={loading}
                disableDefaultStyle/>
        </StripeProvider>
    );
}

export default Checkout;