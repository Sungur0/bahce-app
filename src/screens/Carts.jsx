
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


export default function Carts() {
  const cart = useSelector((state) => state.cart); // Redux store'daki cart bilgisini al


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepet İçeriği</Text>
      {Object.entries(cart).map(([userId, products]) => (
        <View key={userId}>
          <Text style={styles.userId}>Kullanıcı ID: {userId}</Text>
          {products.map((product, index) => (
            <Text key={index}>{product.name}</Text>
          ))}
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