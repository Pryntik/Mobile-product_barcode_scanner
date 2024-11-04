import reverseCameraIcon from '../assets/reverse_camera.png';
import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { cameraStyle } from "../styles/Camera";

const Accueil = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if (!permission || !isCameraActive) {
        return <View style={cameraStyle.container}/>;
    }
    
    if (!permission.granted) {
        return (
            <View style={cameraStyle.container}>
                <Text style={cameraStyle.message}>Nous avons besoin de la permission d'accès à la caméra</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    
    return (
        <View style={cameraStyle.container}>
            <CameraView style={cameraStyle.camera} facing={facing}>
                <View style={cameraStyle.buttonContainer}>
                    <TouchableOpacity style={cameraStyle.button} onPress={toggleCameraFacing}>
                        <Image style={cameraStyle.image} source={reverseCameraIcon}/>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

export default Accueil;