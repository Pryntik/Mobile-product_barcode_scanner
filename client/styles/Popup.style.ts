import { StyleSheet } from 'react-native';

export const popupStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        height: '30%',
    },
    viewButtonClose: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        height: 50,
        marginRight: 20,
        marginTop: 10,
    },
    buttonClose: {
        position: 'absolute',
        width: 20,
        height: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    content: {
        fontSize: 16,
        margin: 10,
    },
});