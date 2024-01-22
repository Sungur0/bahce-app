
import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { selectTotalPrice, selectTotalDiscountAmount } from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import Font from "../constants/Font";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity } from '../redux/cartSlice';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';



export default function Carts({ navigation }) {
  const userId = useSelector((state) => state.user.user.userId);
  const cartItems = useSelector((state) => state.cart[userId] || []);

  const totalPrice = useSelector(state => selectTotalPrice(state, userId));

  const totalDiscountPrice = useSelector(state => selectTotalDiscountAmount(state, userId))

  const formattedTotalPrice = totalPrice.toFixed(2);
  
  const dispatch = useDispatch()


  const handleProductPress = (productId) => {
    navigation.navigate('Ürün Detayı', { productId });
  };

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', paddingVertical: 10 }}>

      {cartItems.length === 0 || !cartItems ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <Icon name="shoppingcart" size={90} color='#000' style={{ opacity: 0.3, }} />
          <Text style={{ fontFamily: Font["poppins-regular"], textAlign: 'center', fontSize: 20, opacity: 0.3, paddingVertical: 15 }}>Sepetiniz Boş.</Text>
        </View>
        :
        <Animated.View style={{ flex: 1, alignItems: 'center', }}
          entering={FadeInDown.duration(1000).springify()}>

          {cartItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleProductPress(item.id)}>

              <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', margin: 6 }}>

                <View style={{ width: '96%', backgroundColor: '#fff', borderRadius: 6, flexDirection: 'row', alignItems: 'center', position: 'relative', padding: 10, }}>
                  {/* flex eklenebilir */}

                  <View style={styles.cartItemsImage}>
                    <Image source={item.src}
                      style={styles.itemImage} />
                  </View>

                  <View style={{ flex: 1, marginTop: 8, marginLeft: 12 }}>
                    {/* , alignItems:'center' */}

                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', }} >
                      <Text>{item.name}</Text>

                      <Text>{item.price}</Text>
                    </View>
                  </View>


                  <View style={{ flex: 1 }}>
                    <View style={styles.quantityDropdown}>
                      <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        style={styles.quantityButtons}>

                        <TouchableOpacity
                          onPress={() => dispatch(decreaseQuantity({ userId, productId: item.id }))}
                          style={{ width: '33.3%', flex: 1, alignItems: 'center' }} >
                          <Text style={styles.sepeteEkleText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantity}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => dispatch(addToCart({ userId, product: item }))}
                          style={{ width: '33.3%', flex: 1, alignItems: 'center' }}>
                          <Text style={styles.sepeteEkleText}>+</Text>
                        </TouchableOpacity>

                      </Animated.View>

                    </View>
                  </View>


                </View>
              </View>
            </TouchableOpacity>

          ))}

          <View style={styles.bottomContainer}>
            <Animated.View
              style={{ width: '100%', flex: 1, alignItems: 'center' }}
              entering={FadeInDown.duration(1000).springify()} >
              <TouchableOpacity style={styles.sepeteEkleButton} onPress={() => navigation.navigate('Ödeme Yap')} >
                <View style={styles.continueBtn}>
                  <Text style={styles.continue}>Devam</Text>

                </View>
                <View style={styles.totalPrice}>
                  <Text style={[styles.price, {
                    fontSize: 13, 
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    color:'grey'
                  }]}>₺{totalDiscountPrice.toFixed(2)}</Text>
                  <Text style={styles.price}>₺{formattedTotalPrice}</Text>

                </View>

              </TouchableOpacity>
            </Animated.View>
          </View>

        </Animated.View >
      }

    </SafeAreaView >

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userId: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  cartProducts: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 15,
  },
  cartItemsImage: {
    width: '30%'
  },
  itemImage: {
    height: 100,
    width: '100%',
    resizeMode: 'cover',
  },
  quantityButtons: {
    backgroundColor: '#EEEDED',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity: {
    paddingVertical: 6,
    height: '100%',
    backgroundColor: '#80B905',
    textAlign: 'center',
    fontSize: 15,
    width: '33.3%',
    color: '#fff',
    fontFamily: Font["poppins-regular"],

  },
  quantityDropdown: {
    width: '100%',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#80B905',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  bottomContainer: {
    height: 50,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sepeteEkleButton: {
    width: '85%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#80B905',
    alignItems: 'center',
    borderRadius: 10,
  },
  continueBtn: {
    width: '70%',
    alignItems: 'center',
  },
  totalPrice: {
    width: '30%',
    height: '100%',
    backgroundColor: '#EEEDED',
    flexDirection: 'column',
    alignItems: 'flex-center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#80B905',
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },

  price: {
    fontFamily: Font["poppins-regular"],
    fontSize: 19,
    color:'#80B905'
  },
  continue: {
    fontFamily: Font["poppins-regular"],
    fontSize: 19,
    color: '#fff',

  }

});

