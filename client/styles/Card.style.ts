import { StyleSheet } from 'react-native';

export const cardStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 80,
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
    otherData: {
        display: 'flex',
        flexDirection: 'column',
    },
    otherDataTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    otherDataBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonQuantity: {
        width: 20,
        height: 20,
    }
});