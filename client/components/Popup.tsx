import checkIcon from "../assets/img/check.png";
import crossIcon from "../assets/img/cross.png";
import ImageButton from "./ImageButton";
import CardProduct from "./CardProduct";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleProp, TextInput, View, ViewStyle } from "react-native"
import { popupStyle } from "../styles/Popup.style";
import { getProductCard, getProductId, getProductSaveFromCard, getProductValidIconStatus, isValidProductToSave } from "../utils/item.util";
import { ProductCardUnknown, ProductCardType, ProductCardDefault, ProductType, MaybeType } from "../types/TItem";
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
    scanProduct?: MaybeType<ProductType>,
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
    const [isShow, setIsShow] = useState(isVisible);
    const [productCard, setProductCard] = useState<ProductCardType>(ProductCardUnknown);
    const [newProductCard, setNewProductCard] = useState<ProductCardType>(ProductCardUnknown);
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
        const productSave = await getProductSaveFromCard({
            ...productCard,
            price: newProductCard.price,
            quantity: newProductCard.quantity,
        });
        if (isValidProductToSave(productSave)) {
            await addProductDB(productSave);
        }
        else toast('Product not valid');
    };

    const addManualProduct = async () => {
        if (formName !== '' && formPrice >= 100) {
            const id = await getProductId();
            const productSave = await getProductSaveFromCard({
                ...ProductCardDefault,
                id: id,
                name: formName,
                price: formPrice,
            });
            await addProductDB(productSave);
            setFormName('');
            setFormPrice(0);
            await updateProductCard();
            closePopup();
        }
        else if (formPrice < 100) toast('Price must be greater or equal than 100');
        else toast('Product not valid');
    };

    const popupViewMode = () => {
        if (data.type === 'card') {
            return (
                <View style={style?.view}>                
                    <CardProduct
                        product={productCard}
                        getCardProduct={(cardProduct) => setNewProductCard(cardProduct)}
                        mode='popup'
                        style={popupStyle.buttonCard}/>
                    <ImageButton
                        onClick={addProduct}
                        text="Add product"
                        src={getProductValidIconStatus(productCard)}
                        alt="Add product"
                        style={{
                            view: popupStyle.buttonSubmit_view,
                            button: popupStyle.buttonSubmit_button,
                            text: popupStyle.buttonSubmit_text,
                            image: popupStyle.buttonSubmit_image,
                        }}
                        disableDefaultStyle/>
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

    const updateProductCard = async () => {
        const cardProduct = await getProductCard(data.scanProduct);
        setProductCard(cardProduct);
    }

    useEffect(() => {
        updateProductCard();
    }, [data.scanProduct]);

    useEffect(() => {
        data.form?.getName(formName);
        data.form?.getPrice(formPrice);
    }, [formName, formPrice]);


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