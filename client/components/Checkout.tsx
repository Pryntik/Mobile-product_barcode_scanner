import walletIcon from "../assets/img/wallet.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { basketStyle } from "../styles/Basket.style";
import { getAllProductsDB } from "../services/db";
import { USER_ID, API_IP, API_PORT } from "@env";
import { getProductCheckoutFromSave } from "../utils/item.util";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../styles/Theme.style";
import { toast } from "../utils/global.util";

type CheckoutType = {
    getClick?(isClick: boolean): void,
    setClick?: boolean,
};

const Checkout = ({getClick, setClick}: CheckoutType) => {
    const [isClick, setIsClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState<string>('');
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const theme = useTheme() as ThemeType;
    const apiUrl = `http://${API_IP}:${API_PORT}`;

    const fetchPaymentSheetParams = async () => {
        try {
            const productsDB = await getAllProductsDB();
            const products = productsDB.map(product => getProductCheckoutFromSave(product));
            const body = JSON.stringify(JSON.stringify({
                "pending_items": products,
                "customer_id": USER_ID,
            }));
            toast(`customer_id: ${USER_ID}\npending_items: ${JSON.stringify(products)}`);
            const response = await fetch(`${apiUrl}/payments/`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body,
            });
            const { paymentIntent, ephemeralKey, customer } = await response.json();

            return {
                paymentIntent,
                ephemeralKey,
                customer,
            };            
        }
        catch(error) {
            toast(`Error: ${error}`);
            throw error;
        }
    };

    const initializePaymentSheet = async () => {
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
                    "customer_id": USER_ID
                })
            });

            if (response.status == 200) Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    const clickCheckout = async () => {
        await initializePaymentSheet();
        await openPaymentSheet();
        setIsClick(true);
    }

    useEffect(() => {
        if (setClick && getClick) {
            setIsClick(setClick)
            getClick(setClick);
        }
    }, [setClick]);

    useEffect(() => {
        setIsClick(isClick)
        getClick && getClick(isClick);
    }, [isClick]);

    return (
        <ImageButton
            style={{
                button: basketStyle.tabButton_button,
                text: basketStyle.tabButton_text,
                image: basketStyle.tabButton_image,
            }}
            colorButton={{backgroundColor: 'lightblue', clickColor: theme.colors.click}}
            text="Checkout"
            alt="Checkout"
            src={walletIcon}
            onClick={clickCheckout}
            disableButton={loading}
            disableDefaultStyle/>
    );
}

export default Checkout;