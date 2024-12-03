import crossIcon from "../assets/img/cross.png";
import checkIcon from "../assets/img/check.png";
import React, { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle, Image } from "react-native";
import { PaymentType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { getItemPurchaseAmount, getItemPurchaseLength, parsePrice } from "../utils/item.util";
import { parseBoolean, parseDate, parseNull } from "../utils/global.util";
import { useTheme } from "@react-navigation/native";

type CardPaymentType = {
    payment: PaymentType,
    getPayment?(cardPayment: PaymentType): void,
    style?: StyleProp<ViewStyle>,
}

const CardPayment = ({
    payment,
    getPayment,
    style,
}: CardPaymentType) => {
    const [cardPayment, setCardPayment] = useState(payment);
    const theme = useTheme();

    useEffect(() => {
        setCardPayment(payment);
        getPayment && getPayment(payment);
    }, [payment]);

    return (
        <View style={[cardStyle.container, style]}>
            <View style={cardStyle.data_payment}>
                <View style={cardStyle.firstData_payment}>
                    <Text style={{color: theme.colors.text}}>{cardPayment.id}</Text>
                    <Text style={{color: theme.colors.text}}>{parseDate(cardPayment.checkout_date)}</Text>
                    <Image style={cardStyle.status_payment} source={cardPayment.is_checked ? checkIcon : crossIcon}></Image>
                </View>
                <View style={cardStyle.secondData_payment}>
                    <Text style={{color: theme.colors.text}}>{cardPayment.customer.id}</Text>
                    <Text style={{color: theme.colors.text}}>{cardPayment.customer.email}</Text>
                </View>
                <View style={cardStyle.thirdData_payment}>
                    <Text style={{color: theme.colors.text}}>{getItemPurchaseLength(cardPayment.purchased_items)}</Text>
                    <Text style={{color: theme.colors.text}}>{parsePrice(getItemPurchaseAmount(cardPayment.purchased_items), '€')}</Text>
                </View>
            </View>
        </View>
    )
}

export default CardPayment;