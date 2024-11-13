import checkIcon from "../assets/img/check.png";
import crossIcon from "../assets/img/cross.png";
import ImageButton from "./ImageButton";
import CardProduct from "./CardProduct";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleProp, TextInput, View, ViewStyle } from "react-native"
import { popupStyle } from "../styles/Popup.style";
import { BarcodeScanningResult } from "expo-camera";
import { getProductCard, getProductSaveFromCard, getProductValidIconStatus, isValidProductStatus } from "../utils/item.util";
import { productCardDefault, ProductCardType } from "../types/TItem";
import { addProductDB } from "../services/db";
import { toast } from "../utils/log.util";
import { basketStyle } from "../styles/Basket.style";

type PopupDataModeType = 'card' | 'form';

type PopupFormType = {
    getName(name: string): void,
    getPrice(price: number): void,
};

type PopupDataType = {
    type: PopupDataModeType,
    scanItem?: BarcodeScanningResult,
    form?: PopupFormType,
}

type StylePopupType = {
    view?: StyleProp<ViewStyle>,
    closeButton?: StyleProp<ViewStyle>,
}

type PopupType = {
    data: PopupDataType,
    isVisible?: boolean,
    isClosed?(isClose: boolean): void,
    style?: StylePopupType,
}

const Popup = ({
    data,
    isVisible = false,
    isClosed,
    style,
}: PopupType) => {
    const ySize = 300;
    const slideAnim = useRef(new Animated.Value(ySize)).current;
    const popupStyle_view = [popupStyle.container, {transform: [{translateY: slideAnim}]}, style?.view];
    const closeStyle_button = [popupStyle.buttonClose_button, style?.closeButton]
    const dataItem = data.scanItem;
    const [isShow, setIsShow] = useState(isVisible);
    const [productCard, setProductCard] = useState<ProductCardType>(productCardDefault);
    const [cardQuantity, setCardQuantity] = useState(productCard.quantity);
    const [cardPrice, setCardPrice] = useState(productCard.price);
    const [formName, setFormName] = useState('');
    const [formPrice, setFormPrice] = useState(0);

    const openPopup = () => {
        setIsShow(true);
        isClosed && isClosed(false);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: ySize,
            useNativeDriver: true,
        }).start();
    }

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

    const addProduct = async () => {
        if (isValidProductStatus(productCard)) {
            const pSave = await getProductSaveFromCard({
                ...productCard,
                price: cardPrice,
                quantity: cardQuantity,
            });
            await addProductDB(pSave);
        }
        else toast('Product not valid');
    };

    const addManualProduct = async () => {
        const pSave = await getProductSaveFromCard({
            ...productCard,
            name: formName,
            price: formPrice,
        });
        if (formName !== '' && formPrice !== 0) {
            await addProductDB(pSave);
            setFormName('');
            setFormPrice(0);
            closePopup();
        }
        else toast('Product not valid');
    };

    const popupViewMode = () => {
        if (data.type === 'card') {
            return (
                <View style={style?.view}>                
                    <CardProduct
                        product={productCard}
                        getCardPrice={(price) => setCardPrice(price)}
                        getCardQuantity={(quantity) => setCardQuantity(quantity)}
                        style={popupStyle.buttonCard}/>
                    <ImageButton
                        onClick={addProduct}
                        text="Add product"
                        src={getProductValidIconStatus(productCard)}
                        alt="Add product"
                        style={{view: popupStyle.buttonSubmit_view}}/>
                </View>
            );
        }
        if (data.type === 'form') {
            return (
                <View style={style?.view}>
                    <TextInput
                        style={[basketStyle.manual_textInput, {marginTop: 50}]}
                        onChangeText={(text) => setFormName(text)}
                        placeholder="Name"/>
                    <TextInput
                        style={basketStyle.manual_textInput}
                        keyboardType="numeric"
                        onChangeText={(text) => !isNaN(parseInt(text)) && setFormPrice(parseInt(text))}
                        placeholder="Price"/>
                    <ImageButton
                        onClick={addManualProduct}
                        text="Add product"
                        src={checkIcon}
                        alt="Add product"
                        style={{view: basketStyle.manual_submitInput}}/>
                </View>
            );
        };
    };

    useEffect(() => {
        data.form?.getName(formName);
        data.form?.getPrice(formPrice);
    }, [formName, formPrice]);

    useEffect(() => {
        getProductCard(dataItem?.data).then(item => {
            setProductCard(item);
        }).catch(error => {
            console.error('Error Popup useEffect[dataItem]:', error);
        });
    }, [dataItem]);

    useEffect(() => {
        if (isVisible === true) openPopup();
        else closePopup();
    }, [isVisible]);

    return (
        isShow && (
            <Animated.View style={popupStyle_view}>
                <ImageButton 
                    onClick={closePopup}
                    src={crossIcon}
                    alt="Close"
                    style={{
                        button: closeStyle_button,
                        image: popupStyle.buttonClose_image
                    }}
                    disableDefaultStyle/>
                {popupViewMode()}
            </Animated.View>
        )
    );
}

export default Popup;