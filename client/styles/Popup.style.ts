import { StyleSheet } from 'react-native';

export const popupStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: '30%',
    },
    buttonClose_view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingRight: 10,
        width: '95%',
    },
    buttonClose_image: {
        position: 'absolute',
        width: 20,
        height: 20,
    },
    buttonAdd_view: {
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