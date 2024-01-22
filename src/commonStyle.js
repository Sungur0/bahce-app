import { StyleSheet } from 'react-native';
export const commonStyles = StyleSheet.create({
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
    },
    discountContainer: {
        padding: 5,
    },
    discountedPrice: {
        marginLeft: 0,
        width: '100%',
        textAlign: 'center',
        padding: 5,
    },
    discountText: {
        color: 'grey',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
});