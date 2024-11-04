import { StyleSheet } from 'react-native';

export const cameraStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: 70,
        marginRight: 15,
        marginBottom: 15,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        height: 50,
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});