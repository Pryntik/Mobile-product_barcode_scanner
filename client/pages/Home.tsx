import CameraLayout from "../components/CameraLayout";
import Popup from "../components/Popup";
import React, { useEffect, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import { View } from "react-native";
import { homeStyle } from "../styles/Home.style";

const Home = () => {
    const [popupIsVisible, setPopupIsVisible] = useState(false);
    const [scanResult, setScanResult] = useState<BarcodeScanningResult | undefined>(undefined);

    const popupIsClose = () => {
        setPopupIsVisible(false);
        setScanResult(undefined);
    }

    useEffect(() => {
        if (scanResult) {
            setPopupIsVisible(true);
        }
    }, [scanResult]);

    return (
        <View style={homeStyle.container}>
            <CameraLayout getScanResult={(result) => setScanResult(result)}/>
            <Popup
                isVisible={popupIsVisible}
                isClosed={popupIsClose}
                data={{scanItem: scanResult}}/>
        </View>
    );
}

export default Home;