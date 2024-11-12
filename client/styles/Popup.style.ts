import { StyleSheet } from 'react-native';

export const popupStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: '30%',
        borderWidth: 2,
        borderColor: '#f0f0f0',
    },
    buttonClose_button: {
        position: 'absolute',
        zIndex: 3,
        right: 0,
        marginTop: 10,
        marginRight: 10,
    },
    buttonClose_image: {
        width: 20,
        height: 20,
    },
    buttonCard: {
        position: 'absolute',
        marginTop: 50,
    },
    buttonSubmit_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: '30%',
        marginRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
    },
});