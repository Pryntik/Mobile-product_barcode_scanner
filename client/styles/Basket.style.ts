import { StyleSheet } from 'react-native';

export const basketStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    scroll_view: {
        height: '100%',
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
    checkout_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        borderWidth: 2,
        borderColor: '#f0f0f0',
    },
    checkout_button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 120,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'lightblue',
    },
    checkout_text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkout_image: {
        width: 25,
        height: 25,
    }
});