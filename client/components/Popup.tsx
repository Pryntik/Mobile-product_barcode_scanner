import crossIcon from "../assets/cross.png";
import ImageButton from "./ImageButton";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native"
import { popupStyle } from "../styles/Popup.style";
import { BarcodeScanningResult } from "expo-camera";

type PopupType = {
    isVisible?: boolean,
    title?: string,
    content?: string,
    data?: {
        scanItem?: BarcodeScanningResult,
    }
}

const Popup = ({
    isVisible = false,
    title = '',
    content = '',
    data,
}: PopupType) => {
    const [isShow, setIsShow] = useState(isVisible);
    const scanItem = data?.scanItem;

    useEffect(() => {
        if (isVisible) {
            setIsShow(isVisible);
        }
    }, [isVisible]);

    return (
        isShow && (
            <View style={popupStyle.container}>
                <ImageButton 
                    onClick={() => setIsShow(false)}
                    styleView={popupStyle.viewButtonClose}
                    styleImage={popupStyle.buttonClose} 
                    src={crossIcon}/>
                <Text style={popupStyle.title}>{title || scanItem?.data}</Text>
                <Text style={popupStyle.content}>{content || scanItem?.raw}</Text>
            </View>
        )
    );
}

export default Popup;