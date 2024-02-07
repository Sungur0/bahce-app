import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../redux/favoriteSlice';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Font from "../constants/Font";

export default function FavoriteScreen() {

    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.favorite.products);

    const removeFavorite = (product) => {
        Alert.alert(
            'Favorilerden Kaldır',
            'Bu ürünü favorilerden kaldırmak istediğinizden emin misiniz?',
            [
                { text: 'Vazgeç', style: 'cancel' },
                { text: 'Evet', onPress: () => dispatch(removeFromFavorites(product)) }
            ]
        );
    };

    return (
        <View style={favoriteProducts.length <= 1 ? styles.container : styles.container2}>
            <View style={favoriteProducts.length < 1 ? styles.productsContainer : styles.productsContainer2}>
                {favoriteProducts.map((product, index) => (
                    <View key={index} style={styles.productCard}>
                        <TouchableOpacity style={styles.removeIcon} onPress={() => removeFavorite(product)}>
                            <Text> <Icon3 name='favorite' size={25} color="rgba(253, 132, 7, 1)" /></Text>


                        </TouchableOpacity>
                        <Image source={product.src} style={{ height: 150, width: '100%' }}></Image>
                        <Text style={{ paddingVertical: 5 }}>{product.name}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.price, { marginRight: 5, color: 'grey', textDecorationLine: 'line-through', fontFamily: Font["poppins-regular"], }]}>{product.discount}</Text>

                            <Text style={styles.price}>{product.price}</Text>

                        </View>
                        <Text numberOfLines={2}>{product.description}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    productsContainer2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 5

    },
    productCard: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'rgba(225, 225, 225, 1)',
        shadowOpacity: 1,
        shadowRadius: 10,
        backgroundColor: '#fff',
        width: '45%',
        borderWidth: 1,
        borderColor: 'rgba(225, 225, 225, 1)',
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 9.5
    },
    removeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'transparent',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: Font["poppins-bold"],
        color: 'green',
    },

});
