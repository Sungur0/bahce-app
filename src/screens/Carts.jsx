
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


export default function Carts() {
  const userId = useSelector((state) => state.user.user.userId);
  const cartItems = useSelector((state) => state.cart[userId] || []);
    console.log(cartItems)
  return (
    <View>
      <Text>Sepetim</Text>
      {cartItems.map((item) => (
        <View key={item.id}>
          
          <Text>{item.name}</Text>
          <Text>Fiyat: {item.price}</Text>
          <Text>Fyok</Text>

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