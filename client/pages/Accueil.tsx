import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { cameraStyle } from "../styles/Camera";

const Acceuil = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }
    
    if (!permission.granted) {
        return (
            <View style={cameraStyle.container}>
                <Text style={cameraStyle.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    
    return (
        <View style={cameraStyle.container}>
            <Text>Page Accueil</Text>
            <CameraView style={cameraStyle.camera} facing={facing}>
            <View style={cameraStyle.buttonContainer}>
                <TouchableOpacity style={cameraStyle.button} onPress={toggleCameraFacing}>
                    <Image source={require('../assets/reverse_camera.png')}/>
                </TouchableOpacity>
            </View>
            </CameraView>
        </View>
    );
}

export default Acceuil;