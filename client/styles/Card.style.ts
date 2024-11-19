import { StyleSheet } from 'react-native';

export const cardStyle = StyleSheet.create({
    container: {
        position: 'static',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 80,
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
        lineHeight: 40,
        height: 40,
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
    firstData: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '70%',
    },
    otherData: {
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
        marginRight: '10%',
    },
    otherDataTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 40,
        height: 40,
    },
    otherDataBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 40,
        height: 40,
    },
    buttonQuantity: {
        width: 20,
        height: 20,
    }
});