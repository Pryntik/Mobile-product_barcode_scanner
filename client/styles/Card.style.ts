import { StyleSheet } from 'react-native';

export const cardStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '30%',
        marginTop: 50,
    },
    data: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '100%',
        borderColor: '#f0f0f0',
        borderWidth: 2,
        borderRadius: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 5,
        marginRight: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '50%',
        marginLeft: 5,
        marginRight: 5,
    },
    content: {
        fontSize: 16,
        marginLeft: 5,
        marginRight: 5,
    },
    status: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 5,
    },
});