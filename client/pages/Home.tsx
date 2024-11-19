import CameraLayout from "../components/CameraLayout";
import Popup from "../components/Popup";
import React, { useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { View } from "react-native";
import { homeStyle } from "../styles/Home.style";
import { NullableType, ProductType } from "../types/TItem";
import { getProduct } from "../utils/item.util";

const Home = () => {
    const [popupIsVisible, setPopupIsVisible] = useState(false);
    const [product, setProduct] = useState<NullableType<ProductType>>();

    const popupIsClose = (isClose: boolean) => {
        if (isClose === true) {
            setPopupIsVisible(false);
            setProduct(null);
        }
    }

    const handleScanResult = (result: BarcodeScanningResult) => {
        if (result) {
            const product = getProduct(result.data);
            setProduct(product);
            setPopupIsVisible(true);
        }
    };

    return (
        <View style={homeStyle.container}>
            <CameraLayout getScanResult={handleScanResult}/>
            <Popup
                isVisible={popupIsVisible}
                isClosed={popupIsClose}
                data={{type: 'card', scanProduct: product}}/>
        </View>
    );
}

export default Home;