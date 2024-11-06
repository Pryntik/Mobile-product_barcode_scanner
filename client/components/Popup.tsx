import crossIcon from "../assets/img/cross.png";
import checkIcon from "../assets/img/check.png";
import ImageButton from "./ImageButton";
import CardProduct from "./CardProduct";
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native"
import { popupStyle } from "../styles/Popup.style";
import { BarcodeScanningResult } from "expo-camera";
import { getProduct, getProductCard } from "../utils/item.util";
import { ProductType } from "../types/TItem";
import { useNavigation } from "@react-navigation/native";
import { RouteType } from "../types/TLink";

type PopupType = {
    isVisible?: boolean,
    isClosed?(isClose: boolean): void,
    data?: {
        scanItem?: BarcodeScanningResult,
    }
}

const Popup = ({
    isVisible = false,
    isClosed,
    data,
}: PopupType) => {
    const navigation = useNavigation<RouteType>();
    const ySize = 300;
    const dataItem = data?.scanItem;
    const [product, setProduct] = useState<ProductType | null>(getProduct(dataItem?.data));
    const [isShow, setIsShow] = useState(isVisible);
    const slideAnim = useRef(new Animated.Value(ySize)).current;

    const closePopup = () => {
        Animated.timing(slideAnim, {
            toValue: ySize,
            duration: ySize,
            useNativeDriver: true,
        }).start(() => {
            setIsShow(false);
            isClosed && isClosed(true);
        });
    };

    const addProduct = () => {
        navigation.navigate('Basket');
    };

    useEffect(() => {
        setProduct(getProduct(dataItem?.data));
    }, [dataItem]);

    useEffect(() => {
        if (isVisible) {
            setIsShow(isVisible);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: ySize,
                useNativeDriver: true,
            }).start();
        } else {
            closePopup();
        }
    }, [isVisible]);

    return (
        isShow && (
            <Animated.View style={[popupStyle.container, {transform: [{translateY: slideAnim}]}]}>
                <ImageButton 
                    onClick={closePopup}
                    disableDefaultStyle={true}
                    styleView={popupStyle.buttonClose_view}
                    styleImage={popupStyle.buttonClose_image}
                    alt="Close"
                    src={crossIcon}/>
                <CardProduct product={getProductCard(product)}/>
                <ImageButton
                    onClick={addProduct}
                    text="Add product"
                    src={checkIcon}
                    alt="Add product"
                    styleView={popupStyle.buttonAdd_view}/>
            </Animated.View>
        )
    );
}

export default Popup;