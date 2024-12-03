import { StyleSheet } from 'react-native';
import { rootColor } from './Theme.style';

export const historyStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    card: {
        marginTop: 20,
    },
    tabButton_button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 110,
        height: 40,
        borderRadius: 10,
    },
    tabButton_text: {
        fontSize: 12,
    },
    tabButton_image: {
        width: 20,
        height: 20,
    },
    buttons_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: rootColor.white.smoke,
        position: 'absolute',
        bottom: 0,
    }
});