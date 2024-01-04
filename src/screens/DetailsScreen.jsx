import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';

const DetailScreen = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };



  const { productId } = route.params;
  const { products } = useProductContext();
  const navigation = useNavigation();

  const product = products.find((item) => item.id === productId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={handleGoBack}
          color='black'
          type='clear'
          icon={<Icon name="close" size={24} color="white" />}
          style={{ marginLeft: 10, }}
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
  
  return (
    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {loading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
          <Image source={product.src} alt='image' style={styles.image} key={new Date().getTime()} onLoad={handleImageLoad} />
        </View>

        <View style={styles.productDetail}>
        <Text style={styles.price}>{product.price}</Text>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  description: {
    textAlign:'center',
    fontSize: 14,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  productDetail: {
    flex:1,
    alignItems:'center',
    padding:16,
  }
});

export default DetailScreen;