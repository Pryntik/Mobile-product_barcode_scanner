import lessIcon from "../assets/img/less.png";
import moreIcon from "../assets/img/more.png";
import React, { useState } from "react";
import ImageButton from "./ImageButton";
import { View, Text, Image } from "react-native";
import { ProductCardType } from "../types/TItem";
import { cardStyle } from "../styles/Card.style";
import { FlexStyle } from "react-native";
import { getProductQuantity, parsePrice } from "../utils/item.util";

type CardProductType = {
    product: ProductCardType,
    position?: FlexStyle['position'],
}

const CardProduct = ({
    product,
    position = 'static',
}: CardProductType) => {
    const [quantity, setQuantity] = useState(getProductQuantity(product));

    const changeQuantity = (value: number) => {
        const result = quantity + value;
        setQuantity(result < 0 ? 0 : result);
    }

    return (
        <View style={[cardStyle.container, {position: position}]}>
            <View style={cardStyle.data}>
                <Image style={cardStyle.icon} source={product.icon}/>
                <Text style={cardStyle.title}>{product.name}</Text>
                <View style={cardStyle.otherData}>
                    <View style={cardStyle.otherDataTop}>
                        <Text style={cardStyle.content}>{parsePrice(product.price, '€')}</Text>
                        <Image style={cardStyle.status} source={product.statusIcon}/>
                    </View>
                    <View style={cardStyle.otherDataBottom}>
                        <ImageButton
                            styleImage={cardStyle.buttonQuantity}
                            src={lessIcon} onClick={() => changeQuantity(-1)}
                            disableDefaultStyle={true}/>
                        <Text style={cardStyle.content}>{quantity}</Text>
                        <ImageButton
                            styleImage={cardStyle.buttonQuantity}
                            src={moreIcon} onClick={() => changeQuantity(1)}
                            disableDefaultStyle={true}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CardProduct;