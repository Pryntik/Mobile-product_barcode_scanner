import { StyleSheet } from 'react-native';

export const basketStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    scroll_view: {
        height: '100%',
    },
    buttons_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#f0f0f0',
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
    button_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
    },
    button_button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 110,
        height: 40,
        borderRadius: 10,
    },
    button_text: {
        fontSize: 12,
    },
    button_image: {
        width: 20,
        height: 20,
    },
    manual_view: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    manual_textInput: {
        width: 200,
        height: 40,
        marginLeft: 50,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: '#f0f0f0',
        borderRadius: 10,
    },
    manual_submitInput: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: '4%',
        marginRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
    },
});