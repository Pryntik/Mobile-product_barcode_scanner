import crossIcon from "../assets/cross.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, Animated } from "react-native"
import { popupStyle } from "../styles/Popup.style";
import { BarcodeScanningResult } from "expo-camera";

type PopupType = {
    isVisible?: boolean,
    title?: string,
    content?: string,
    isClosed?(isClose: boolean): void,
    data?: {
        scanItem?: BarcodeScanningResult,
    }
}

const Popup = ({
    isVisible = false,
    title = '',
    content = '',
    isClosed,
    data,
}: PopupType) => {
    const ySize = 300;
    const scanItem = data?.scanItem;
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
                    styleView={popupStyle.viewButtonClose}
                    styleImage={popupStyle.buttonClose} 
                    src={crossIcon}/>
                <Text style={popupStyle.title}>{title || scanItem?.data}</Text>
                <Text style={popupStyle.content}>{content || scanItem?.type}</Text>
            </Animated.View>
        )
    );
}

export default Popup;