import emptyHistoryIcon from "../assets/img/history_empty.png";
import ImageButton from "../components/ImageButton";
import CardPayment from "../components/CardPayment";
import ManualPayment from "../components/ManualPayment";
import EmptyHistory from "../components/EmptyHistory";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { getAllPaymentsAPI } from "../services/api";
import { historyStyle } from "../styles/History.style";
import { PaymentDefault, PaymentType } from "../types/TItem";
import { ThemeType } from "../styles/Theme.style";

const History = () => {
    const [payments, setPayments] = useState<PaymentType[]>([]);
    const [historyIsEmpty, setHistoryIsEmpty] = useState(true);
    const [manualId, setManualId] = useState(0);
    const theme = useTheme() as ThemeType;

    const emptyManualPayment = () => {
        setPayments([]);
        setManualId(0);
    }

    const addManualPayment = () => {
        const manualPayment = {...PaymentDefault, id: manualId.toString()};
        setPayments(prevPayment => [...prevPayment, manualPayment]);
        setManualId(manualId + 1);
    }

    const getCardPayments = () => {
        return payments.map((payment, i) => {
            return <CardPayment key={i} payment={payment} style={historyStyle.card}/>
        });
    }

    const historyViewMode = () => {
        if (historyIsEmpty === false) {
            return (
                <View>
                    <ScrollView style={[historyStyle.scroll_view, {backgroundColor: theme.colors.background}]}>
                        {getCardPayments()}
                    </ScrollView>
                    <View style={[historyStyle.buttons_view, {backgroundColor: theme.colors.background}]}>
                        <EmptyHistory getClick={emptyManualPayment}/>
                        <ManualPayment getClick={addManualPayment}/>
                    </View>
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
                <View style={[historyStyle.buttons_view, {backgroundColor: theme.colors.background}]}>
                    <ManualPayment getClick={addManualPayment}/>
                </View>
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

    useEffect(() => {
        setHistoryIsEmpty(payments.length <= 0);
    }, [payments])

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