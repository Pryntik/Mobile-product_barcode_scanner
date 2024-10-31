import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { cameraStyle } from "../styles/Camera";
import { useNavigation } from '@react-navigation/native';
import { RouteType } from "../types/TLink";

const Acceuil = () => {
    const navigation = useNavigation<RouteType>();
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
            <Button title="Panier" onPress={() => navigation.navigate('Panier')}></Button>
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