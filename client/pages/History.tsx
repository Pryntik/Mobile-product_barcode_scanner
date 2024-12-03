import emptyHistoryIcon from "../assets/img/history_empty.png";
import ImageButton from "../components/ImageButton";
import CardPayment from "../components/CardPayment";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { getAllPaymentsAPI } from "../services/api";
import { historyStyle } from "../styles/History.style";
import { PaymentType } from "../types/TItem";
import { ThemeType } from "../styles/Theme.style";

const History = () => {
    const [payments, setPayments] = useState<PaymentType[]>([]);
    const [historyIsEmpty, setHistoryIsEmpty] = useState(true);
    const theme = useTheme() as ThemeType;

    const getCardPayments = () => {
        return payments.map(payment => <CardPayment payment={payment}/>);
    }

    const historyViewMode = () => {
        if (historyIsEmpty === false) {
            return (
                <View>
                    {getCardPayments()}
                </View>
            );
        }
        return (
            <View style={historyStyle.empty_view}>
                <ImageButton
                    src={emptyHistoryIcon}
                    onClick={updatePayments}
                    style={{image: historyStyle.empty_image}}
                    disableDefaultStyle/>
                <Text style={historyStyle.empty_text}>Empty</Text>
            </View>
        );
    }

    const updatePayments = async () => {
        try {
            const paymentsApi = await getAllPaymentsAPI();
            const updatedCardPayment = new Set<PaymentType>();
    
            for (const payment of paymentsApi.data) {
                updatedCardPayment.add(payment);
            }

            setPayments(Array.from(updatedCardPayment));
            setHistoryIsEmpty(paymentsApi.data.length <= 0);
        }
        catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            updatePayments();
        }, [])
    );

    return (
        <View style={[historyStyle.container, {backgroundColor: theme.colors.background}]}>
            {historyViewMode()}
        </View>
    );
}

export default History;