import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeInDown, FadeInUp, BounceIn, BounceOut } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity } from '../redux/cartSlice';
import Font from "../constants/Font";
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import { addToFavorites, removeFromFavorites } from '../redux/favoriteSlice';
import { createSelector } from 'reselect';



const Tab = createMaterialTopTabNavigator();

const selectCart = (state) => state.cart;
const selectUserId = (state) => state.user.user.userId;

const makeSelectCart = createSelector(
  [selectCart, selectUserId],
  (cart, userId) => cart[userId] || []
);

const DetailScreen = () => {
  const dispatch = useDispatch();

  const { products } = useProductContext();
  const route = useRoute();
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { productId } = route.params;
  const navigation = useNavigation();

  const userId = useSelector(selectUserId);
  const cart = useSelector(makeSelectCart);


  const product = products.find((item) => item.id === productId);


  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  const favoriteProducts = useSelector(state => state.favorite.products);

  const isFavorite = favoriteProducts.some(favProduct => favProduct.id === product.id);


  console.log(favoriteProducts)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        cart.length > 0 ? (
          <Animated.View
            entering={BounceIn.duration(500).springify()}
            exiting={FadeInUp.duration(500).springify()}
          >
            <View style={{ borderRadius: 50, backgroundColor: 'rgba(253, 132, 7, 1)', width: 16, height: 16, position: 'absolute', alignItems: 'center', right: '0%', zIndex: 1 }}>
              <Animated.Text
                entering={BounceIn.duration(1000).springify()} style={{ color: '#fff', fontSize: 12 }}>{cart.length}</Animated.Text>
            </View>
            <Button
              onPress={() => navigation.navigate('Sepetim')}
              type='clear'
              icon={<Icon2 name="shopping-basket" size={18} color="white" />}
              style={{ marginLeft: 0 }}
            />
          </Animated.View>
        ) : null
      )
    });
  }, [navigation, cart]);




  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (

        <Button
          onPress={handleGoBack}
          color='black'
          type='clear'
          icon={<Icon name="close" size={24} color="white" />}
          style={{ marginLeft: 0 }}
        />
      ),
    });
  }, [navigation]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Ürün bulunamadı.</Text>
      </View>
    );
  }

  const handleGoBack = () => {
    navigation.goBack();
  };
  const ProductDetailScreen = ({ route }) => {
    const { product } = route.params;

    return (
      <View style={{ flex: 1 }}>
        <Text>Ürün Detayları</Text>
        <Text>{product.name}</Text>
        <Text>{product.description}</Text>
        <Text>{product.price}</Text>
      </View>
    );
  };

  const RecommendedProductsScreen = ({ route }) => {
    const { recommendedProducts } = route.params;

    return (
      <View>
        <Text>{product.name}</Text>

      </View>
    );
  };




  const handleAddToCart = () => {
    dispatch(addToCart({ userId, product }));
  };


  const quantityInCart = cart.find(cartProduct => cartProduct.id === product.id)?.quantity || 0;

  const handleIncreaseQuantity = () => {
    dispatch(addToCart({ userId, product }));
  };

  const handleDecreaseQuantity = () => {
    if (product.quantity < 1) {
      dispatch(removeFromCart({ userId, productId: product.id }));
    }
    else {
      dispatch(decreaseQuantity({ userId, productId: product.id }));

    }
  };




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }} >
        <View style={styles.container}>

          <TouchableOpacity onPress={toggleFavorite} style={styles.favorite} >
            <View style={{
              borderRadius: 50,
              backgroundColor: 'rgba(239, 236, 236, 0.9)',
              padding:8,
              width: 40,
              height: 40
            }} >
              <View>
              <Icon3 name={isFavorite ? 'favorite' : 'favorite-border'} size={25} color="rgba(253, 132, 7, 1)" style={{width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center'}} />        
              </View>

            </View>
          </TouchableOpacity>

          <View>
            {product.models && product.models.length > 0 ? (
              <Swiper
                style={{ height: 300, backgroundColor: '#fff' }}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                loop={false}
                paginationStyle={{ bottom: 5 }}
              >
                {product.models.map((model, index) => (
                  <TouchableOpacity key={index} onPress={() => openLightbox(model)}>
                    <View style={{ height: 300 }}>
                      <Image source={model} style={{ height: 300, objectFit: 'contain', alignSelf: 'center' }} />
                    </View>
                  </TouchableOpacity>
                ))}
              </Swiper>
            ) : (
              <View style={{ height: 300, backgroundColor: '#fff' }}>
                <Image source={product.src} style={{ height: 300, objectFit: 'contain', alignSelf: 'center' }} />
              </View>
            )}
          </View>

          <Modal
            isVisible={lightboxVisible}
            onBackButtonPress={closeLightbox}
            animationIn="fadeIn"
            animationInTiming={1000}
            animationOut="fadeOut"
            animationOutTiming={300}
            style={styles.modal}
            backdropOpacity={1}
          >


            <View>
              <TouchableOpacity onPress={closeLightbox} style={styles.closeButton}>
                <Icon name="close" size={27} color="white" />
              </TouchableOpacity>
              <Image source={selectedImage} style={{ height: 300, resizeMode: 'contain', backgroundColor: '#fff', alignSelf: 'center' }} />
            </View>
          </Modal>



          <View style={styles.productDetail}>
            <View style={{ flexDirection: 'row', }}>
              <Text style={[styles.price, { marginHorizontal: 10, color: 'grey', textDecorationLine: 'line-through', fontFamily: Font["poppins-regular"], }]}>{product.discount}</Text>

              <Text style={styles.price}>{product.price}</Text>

            </View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <Tab.Navigator
            scrollEnabled={true}
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarLabelStyle: { fontSize: 13, textTransform: 'capitalize' },
              tabBarItemStyle: { width: 98 },
              tabBarIndicatorStyle: { backgroundColor: '#FD8407' },
            }}
          >
            <Tab.Screen name="Detaylar" component={ProductDetailScreen} initialParams={{ product }} />

            <Tab.Screen name="Önerilenler" component={RecommendedProductsScreen} initialParams={{ recommendedProducts: product.recommendedProducts }} />
          </Tab.Navigator>

        </View>

      </ScrollView>

      <View style={styles.bottomContainer}>

        {quantityInCart < 1 && (
          <Animated.View
            style={{ width: '100%', flex: 1, alignItems: 'center' }}
            entering={FadeInDown.duration(1000).springify()} >
            <TouchableOpacity style={styles.sepeteEkleButton} onPress={handleAddToCart} >
              <Text style={styles.sepeteEkleText}>Sepete Ekle</Text>
            </TouchableOpacity>
          </Animated.View>
        )}


        {!quantityInCart < 1 && (

          <View style={styles.quantityDropdown}>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              style={styles.quantityButtons}>

              <TouchableOpacity onPress={handleDecreaseQuantity} style={{ width: '33.3%', flex: 1, alignItems: 'center' }} >
                <Text style={styles.sepeteEkleText}>-</Text>
              </TouchableOpacity>




              <Text style={styles.quantity}>
                {quantityInCart}
              </Text>
              <TouchableOpacity onPress={handleIncreaseQuantity} style={{ width: '33.3%', flex: 1, alignItems: 'center' }}>
                <Text style={styles.sepeteEkleText}>+</Text>
              </TouchableOpacity>


            </Animated.View>
          </View>
        )}

      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  bottomContainer: {

    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 15,
    paddingBottom: 40,
    right: 0,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    padding: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    padding: 0,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: Font["poppins-bold"],

  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: Font["poppins-regular"],

  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Font["poppins-bold"],
    color: 'green',
  },
  productDetail: {
    alignItems: 'center',
    padding: 16,

  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  }, activeDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#80B905'
  },
  closeButton: {
    position: 'absolute',
    top: hp('-25%'),
    left: hp('0%'),
    padding: 10,
  },
  sepeteEkleButton: {
    width: '85%',
    flex: 1,
    backgroundColor: '#80B905',
    alignItems: 'center',
    borderRadius: 10,
  },
  quantityButtons: {
    width: '55%',
    backgroundColor: '#80B905',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  quantity: {
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    height: '100%',
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 18,
    width: '33.3%',
    fontFamily: Font["poppins-regular"],

  },

  quantityDropdown: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#80B905',
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  sepeteEkleText: {
    paddingVertical: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',

  },
  favorite: {
    position: 'absolute',
    right: 20,
    top: 5,
    zIndex: 1
  }
});

export default DetailScreen;