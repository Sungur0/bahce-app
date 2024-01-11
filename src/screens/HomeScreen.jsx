import { View, Text, Button, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, } from 'react-native'
import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {

    const navigation = useNavigation();

    const { featuredProducts, getProductsByCategory } = useProductContext();

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => {
    //             return (
    //                 <Button
    //                     title='Sepet'
    //                     onPress={() => navigation.navigate('Sepetim')} />
    //             )
    //         }
    //     })
    // }, [navigation])

    const data = [
        { id: '1', src: require('../../assets/bahce11.jpg'), },
        { id: '2', src: require('../../assets/bahce12.jpg'), },
    ];

    const categories = [
        { id: 1, name: 'Çiçekler', src: require('../../assets/image1.jpg') },
        { id: 2, name: 'Saksılar', src: require('../../assets/image2.jpg') },
        { id: 3, name: 'Topraklar', src: require('../../assets/image3.jpg') },
        { id: 4, name: 'Gübreler', src: require('../../assets/image1.jpg') },
        { id: 5, name: 'Çiçekler', src: require('../../assets/image1.jpg') },
        { id: 6, name: 'Saksılar', src: require('../../assets/image2.jpg') },
        { id: 7, name: 'Topraklar', src: require('../../assets/image3.jpg') },
        { id: 8, name: 'Gübreler', src: require('../../assets/image1.jpg') },
        { id: 9, name: 'Çiçekler', src: require('../../assets/image1.jpg') },
        { id: 10, name: 'Saksılar', src: require('../../assets/image2.jpg') },
        { id: 11, name: 'Topraklar', src: require('../../assets/image3.jpg') },
        { id: 12, name: 'Gübreler', src: require('../../assets/image1.jpg') },
    ]


    const handleCategoryPress = (categoryName) => {
        navigation.navigate('Ürünlerim', { screen: categoryName })
    };

    const handleProductPress = (productId) => {
        navigation.navigate('Ürün Detayı', { productId });
    };


    const CustomButton = ({ title, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
            
        </TouchableOpacity>
    );

    return (
        // <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                    <Carousel
                        data={data}
                        loop={true}
                        autoplay={true}
                        renderItem={ItemCard}
                        sliderWidth={wp(100)}
                        firstItem={1}
                        itemWidth={wp(100) - 45}
                        slideStyle={{ display: 'flex', alignItems: 'center', borderRadius: 20, }}
                    />
                </View>

                <View style={styles.itemList} >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => handleCategoryPress(category.name)}
                            style={styles.itemContainer}
                        >
                            <Image
                                source={category.src}
                                style={styles.itemImage}
                            />
                            <Text style={styles.itemName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: '#dbdbdb', marginVertical: 20 }}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 15 }}>
                        <Text style={{ fontSize: 18 }}>Öne Çıkarılan Ürünler ⏰</Text>
                        {featuredProducts.length >= 4 && (
                            <CustomButton title="Tümünü gör" onPress={() => navigation.navigate('Öne Çıkarılan Ürünler')} />
                            
                        )}
                    </View>

                    <View>
                        <FlatList
                            data={featuredProducts}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleProductPress(item.id)}>

                                    <View style={{ width: 110, marginRight: 13, }}>
                                        <Image source={item.src} style={{ width: 110, height: 110, objectFit: 'cover', borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 20 }} />

                                        <View style={styles.priceContainer}>
                                            {item.discount && (
                                                <View style={styles.discountContainer}>
                                                    <Text style={styles.discountText}>{item.discount}</Text>
                                                </View>
                                            )}
                                            <Text style={[styles.itemPrice, !item.discount && styles.discountedPrice]}>
                                                {item.price}
                                            </Text>

                                        </View>
                                        <Text style={styles.itemName} >{item.name}</Text>

                                    </View>
                                </TouchableOpacity>

                            )}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        />
                    </View>
                </View>




            </ScrollView>

        // </SafeAreaView>
    )
}

const ItemCard = ({ item, index }, parallaxProps) => {
    return (
        <View style={{ width: wp(100) - 35, height: hp(14), marginTop: 10, }}>
            <ParallaxImage
                source={item.src}
                containerStyle={{
                    borderRadius: 20, width: '100%', height: '100%', borderWidth: 1,
                    borderColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center'
                }}
                style={{ resizeMode: 'contain' }}
                parallaxFactor={0}
                {...parallaxProps}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonText: {
        color: '#80B905',
        fontSize: 11,
    },
    itemList: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    itemContainer: {
        flexDirection: 'column',
        padding: 7,
        width: `25%`,
        flexWrap: 'wrap',
        paddingTop: '5%'

    },
    itemName: {
        textAlign: 'center',
        width: '100%',
        marginLeft: 0,
        fontSize: 13,
    },
    itemImage: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor: '#dbdbdb',

    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
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
    },
    discountText: {
        color: 'grey',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    imageContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'cover',
    },
});

export default HomeScreen   