import { View, Text, Button, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, } from 'react-native'
import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';

const HomeScreen = () => {

    const navigation = useNavigation();
    // const { products } = useProductContext();

    // const keyExtractor = (item) => item.id.toString();

    // const handleProductPress = (productId) => {
    //     navigation.navigate('Ürün Detayı', { productId });
    // };

    // const renderItems = ({ item }) => (
    //     <TouchableOpacity
    //         onPress={() => handleProductPress(item.id)}
    //         style={styles.itemContainer}
    //     >
    //         <Image source={item.src}
    //             style={styles.itemImage} />

    //         <View style={styles.priceContainer}>
    //             {item.discount && (
    //                 <View style={styles.discountContainer}>
    //                     <Text style={styles.discountText}>{item.discount}</Text>
    //                 </View>
    //             )}
    //             <Text style={[styles.itemPrice, !item.discount && styles.discountedPrice]}>
    //                 {item.price}
    //             </Text>

    //         </View>
    //         <Text style={styles.itemName} >{item.name}</Text>

    //     </TouchableOpacity>
    // );


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
        { id: 1, name: 'Çiçekler', src: require('../../assets/splash.png') },
        { id: 2, name: 'Saksılar', src: require('../../assets/image2.jpg') },
        { id: 3, name: 'Topraklar', src: require('../../assets/image3.jpg') },
        { id: 4, name: 'Gübreler', src: require('../../assets/image1.jpg') },
        { id: 5, name: 'Saksılar', src: require('../../assets/image2.jpg') },
        { id: 6, name: 'Topraklar', src: require('../../assets/image3.jpg') },
        { id: 7, name: 'Topraklar', src: require('../../assets/image3.jpg') },
        { id: 8, name: 'Gübreler', src: require('../../assets/image1.jpg') },
        { id: 9, name: 'Çiçekler', src: require('../../assets/splash.png') },

    ]
    const handleCategoryPress = (categoryName) => {
        navigation.navigate('Ürünlerim', { categoryName });
    };



  
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View>

                    <Carousel
                        data={data}
                        loop={true}
                        autoplay={true}
                        renderItem={ItemCard}
                        hasParallaxImages={true}
                        sliderWidth={wp(100)}
                        firstItem={1}
                        autoplayInterval={5000}
                        itemWidth={wp(100) - 50}
                        slideStyle={{ display: 'flex', alignItems: 'center', }}
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

            </ScrollView>

        </SafeAreaView>
    )
}
{/* <FlatList
                    data={products}
                    renderItem={renderItems}
                    keyExtractor={keyExtractor}
                    style={styles.itemList}
                    numColumns={3}

                /> */}
const ItemCard = ({ item, index }, parallaxProps) => {
    return (
        <View style={{ width: wp(105) - 60, height: hp(19), marginTop: 10,}}>
            <ParallaxImage
                source={item.src}
                containerStyle={{ borderRadius: 20, flex: 1 }}
                style={{ resizeMode: 'contain' }}
                parallaxFactor={1}
                {...parallaxProps}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
     
    },
    itemList: {
        marginTop:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        // justifyContent: 'space-between', 
        paddingLeft: '3%',
        paddingRight: '3%',
        
    },
    itemContainer: {
        flexDirection: 'column',
        padding: 7,
        width: `25%`,
        flexWrap: 'wrap',
    },
    itemName: {
        textAlign: 'center',
        width: '100%',
        marginLeft: 0,
        fontSize:13,
    },
    itemImage: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor:'#dbdbdb',

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