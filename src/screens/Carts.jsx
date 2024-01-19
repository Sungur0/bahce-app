
import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { selectTotalPrice } from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import Font from "../constants/Font";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity } from '../redux/cartSlice';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const EmptyCart = require('../../assets/empty-cart.jpeg');
export default function Carts() {
  const userId = useSelector((state) => state.user.user.userId);
  const cartItems = useSelector((state) => state.cart[userId] || []);

  const totalPrice = useSelector(state => selectTotalPrice(state, userId));
  const formattedTotalPrice = totalPrice.toFixed(2);



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


          {cartItems.map((item) => (

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
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
                    <Text>123122</Text>
                    <Text>32131</Text>

                    <Text>{item.price}</Text>
                  </View>
                </View>


                <View style={{ flex: 1 }}>
                  <View style={styles.quantityDropdown}>
                    <Animated.View
                      entering={FadeInDown.duration(1000).springify()}
                      style={styles.quantityButtons}>

                      <TouchableOpacity style={{ width: '33.3%', flex: 1, alignItems: 'center' }} >
                        <Text style={styles.sepeteEkleText}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantity}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity style={{ width: '33.3%', flex: 1, alignItems: 'center' }}>
                        <Text style={styles.sepeteEkleText}>+</Text>
                      </TouchableOpacity>

                    </Animated.View>

                  </View>
                </View>



              </View>
            </View>
          ))}

          <View style={styles.bottomContainer}>
            <Text>{formattedTotalPrice}</Text>
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
  // cartProductDescription: {
  //   flex:1,
  //   flexDirection:'column',
  //   justifyContent:'flex-start',
  //   alignItems:'flex-start',
  //   width: '40%'
  // }
    bottomContainer: {

    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 15,
    paddingBottom: 40,
    right: 0,
    backgroundColor: '#fff',
  },
});


// const dispatch = useDispatch();


// const handleIncreaseQuantity = () => {
//   dispatch(addToCart({ userId, product }));
// };

// const handleDecreaseQuantity = () => {
//   if (product.quantity < 1) {
//     dispatch(removeFromCart({ userId, productId: product.id }));
//   }
//   else {
//     dispatch(decreaseQuantity({ userId, productId: product.id }));

//   }
// };
