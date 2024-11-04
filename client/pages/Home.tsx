import CameraLayout from "../components/CameraLayout";
import Popup from "../components/Popup";
import React, { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { ToastAndroid, View } from "react-native";
import { homeStyle } from "../styles/Home.style";

const Home = () => {
    const [popupIsVisible, setPopupIsVisible] = useState(false);
    const [scanResult, setScanResult] = useState<BarcodeScanningResult | undefined>(undefined);

    useEffect(() => {
        if (scanResult) {
            setPopupIsVisible(true);
        }
    }, [scanResult]);

    return (
        <View style={homeStyle.container}>
            <CameraLayout getScanResult={(result) => setScanResult(result)}/>
            <Popup isVisible={popupIsVisible} data={{scanItem: scanResult}}/>
        </View>
    );
}

export default Home;