import { StyleSheet } from 'react-native';

export const historyStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    empty_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    empty_image: {
        width: 200,
        height: 200,
    },
    empty_text: {
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: '#a9a9a9',
    },
});