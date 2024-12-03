import React, { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { PaymentType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { getItemPurchaseAmount, getItemPurchaseLength } from "../utils/item.util";

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

    useEffect(() => {
        setCardPayment(payment);
        getPayment && getPayment(payment);
    }, [payment]);

    return (
        <View style={[cardStyle.container, style]}>
            <View style={cardStyle.data}>
                <View style={cardStyle.firstData_product}>
                    <Text style={cardStyle.title}>{cardPayment.id}</Text>
                    <Text style={cardStyle.content}>{cardPayment.checkout_date}</Text>
                    <Text style={cardStyle.content}>{cardPayment.is_checked}</Text>
                </View>
                <View style={cardStyle.secondData_payment}>
                    <Text style={cardStyle.title}>{cardPayment.customer.id}</Text>
                    <Text style={cardStyle.content}>{cardPayment.customer.email}</Text>
                </View>
                <View style={cardStyle.thirdData_payment}>
                    <Text style={cardStyle.title}>{getItemPurchaseLength(cardPayment.purchased_items)}</Text>
                    <Text style={cardStyle.content}>{getItemPurchaseAmount(cardPayment.purchased_items)}</Text>
                </View>
            </View>
        </View>
    )
}

export default CardPayment;