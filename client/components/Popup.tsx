import checkIcon from "../assets/img/check.png";
import unknownIcon from "../assets/img/unknown.png";
import crossIcon from "../assets/img/cross.png";
import ImageButton from "./ImageButton";
import CardProduct from "./CardProduct";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ToastAndroid } from "react-native"
import { popupStyle } from "../styles/Popup.style";
import { BarcodeScanningResult } from "expo-camera";
import { getProduct, getProductCard, getProductSave, getProductSaveFromCard, getProductValidIconStatus, isValidProductStatus } from "../utils/item.util";
import { productCardDefault, ProductCardType } from "../types/TItem";
import { useNavigation } from "@react-navigation/native";
import { RouteType } from "../types/TLink";
import { addProductDB } from "../services/db";

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
    const slideAnim = useRef(new Animated.Value(ySize)).current;
    const [isShow, setIsShow] = useState(isVisible);
    const [productCard, setProductCard] = useState<ProductCardType>(productCardDefault);
    const [cardQuantity, setCardQuantity] = useState(productCard.quantity);
    const [cardPrice, setCardPrice] = useState(productCard.price);

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
        if (isValidProductStatus(productCard)) {
            getProductSaveFromCard({
                ...productCard,
                price: cardPrice,
                quantity: cardQuantity,
            }).then(product => {
                addProductDB(product);
                ToastAndroid.show('Product added to basket', ToastAndroid.SHORT);
            }).catch(error => {
                console.error('Error Popup addProduct:', error);
            });
        }
        else {
            ToastAndroid.show('Product not valid', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        getProductCard(dataItem?.data).then(item => {
            setProductCard(item);
        }).catch(error => {
            console.error('Error Popup useEffect[dataItem]:', error);
        });
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
                    src={crossIcon}
                    alt="Close"
                    styleView={popupStyle.buttonClose_view}
                    styleImage={popupStyle.buttonClose_image}
                    disableDefaultStyle/>
                <CardProduct
                    product={productCard}
                    position="absolute"
                    getCardPrice={(price) => setCardPrice(price)}
                    getCardQuantity={(quantity) => setCardPrice(quantity)}/>
                <ImageButton
                    onClick={addProduct}
                    text="Add product"
                    src={getProductValidIconStatus(productCard)}
                    alt="Add product"
                    styleView={popupStyle.buttonAdd_view}/>
            </Animated.View>
        )
    );
}

export default Popup;