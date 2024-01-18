
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '../redux/cartSlice';

export default function Carts() {
  const userId = useSelector((state) => state.user.user.userId);
  const cartItems = useSelector((state) => state.cart[userId] || []);

  const totalPrice = useSelector(state => selectTotalPrice(state, userId));
  const formattedTotalPrice = totalPrice.toFixed(2);
  console.log(totalPrice)
  

  return (
    <View>

      <Text>{formattedTotalPrice}</Text>
      {cartItems.map((item) => (
        <View key={item.id} style={{paddingVertical:15}}>

          <Text>{item.name}</Text>
          <Text>Fiyat: {item.price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userId: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});