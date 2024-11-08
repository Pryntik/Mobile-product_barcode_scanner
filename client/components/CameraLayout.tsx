import reverseCameraIcon from '../assets/img/reverse_camera.png';
import React, { useState } from "react";
import { cameraStyle } from "../styles/Camera.style";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';

type CameraLayoutType = {
    getScanResult(scanResult: BarcodeScanningResult): void,
}

const CameraLayout = ({getScanResult}: CameraLayoutType) => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const reverseCamera = () =>  {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const cameraViewMode = () => {
        if (permission && permission.granted === false) {
            return (
                <>
                    <Text style={cameraStyle.message}>Nous avons besoin de la permission d'accès à la caméra</Text>
                    <Button onPress={requestPermission} title="Permission de caméra" />
                </>
            );
        }
        return (
            <CameraView style={cameraStyle.camera} facing={facing} onBarcodeScanned={(scanResult) => getScanResult(scanResult)}>
                <View style={cameraStyle.buttonContainer}>
                    <TouchableOpacity style={cameraStyle.button} onPress={reverseCamera}>
                        <Image style={cameraStyle.image} source={reverseCameraIcon}/>
                    </TouchableOpacity>
                </View>
            </CameraView>
        )
    }

    return (
        <View style={cameraStyle.container}>
            {cameraViewMode()}
        </View>
    );
}

export default CameraLayout;