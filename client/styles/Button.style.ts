import { StyleSheet } from 'react-native';

export const buttonStyle = StyleSheet.create({
    imageButton_view: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
    },
    imageButton_button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
    },
    imageButton_text: {
        marginLeft: 10,
        marginRight: 10,
    },    
    imageButton_image: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
});