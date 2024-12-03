import { StyleSheet } from 'react-native';
import { rootColor } from './Theme.style';

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
        borderColor: rootColor.white.smoke,
    },
    popup_view: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        textAlign: 'center',
        height: '100%',
    },
    buttonSubmit_button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginRight: 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
    },
    buttonSubmit_text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 15,
    },
    buttonSubmit_image: {
        width: 25,
        height: 25,
        marginLeft: 5,
    },
});