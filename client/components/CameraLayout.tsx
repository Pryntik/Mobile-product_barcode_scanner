import reverseCameraIcon from '../assets/reverse_camera.png';
import React, { useEffect, useState } from "react";
import { cameraStyle } from "../styles/Camera";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';

const CameraLayout = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const reverseCamera = () =>  {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const CameraViewMode = () => {
        if (permission && permission.granted === false) {
            return (
                <>
                    <Text style={cameraStyle.message}>Nous avons besoin de la permission d'accès à la caméra</Text>
                    <Button onPress={requestPermission} title="Permission de caméra" />
                </>
            );
        }
        return (
            <CameraView style={cameraStyle.camera} facing={facing}>
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
            {CameraViewMode()}
        </View>
    );
}

export default CameraLayout;