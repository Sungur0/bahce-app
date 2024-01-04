// HomeScreen içinde FeaturedProducts bileşeni
import React, { useState ,useEffect} from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [showAll, setShowAll] = useState(false);
  const navigation = useNavigation();

  const featuredProducts = [
    { id: 1, name: 'Zammia Bitkisi', description: '...', price: '59.62₺', discount: '69.62₺', src: require('../../assets/image1.jpg') },
    { id: 2, name: 'Pembe İkili Dekoratif Saksı', description: '...', price: '39.35₺', discount: '42.35₺', src: require('../../assets/image2.jpg') },
  ];

  const handleShowAll = () => {
    setShowAll(true);
    navigation.navigate('Öne Çıkarılanlar', { featuredProducts });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={!showAll} showsHorizontalScrollIndicator={false}>
        {featuredProducts.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productContainer}
          >
            <Image source={product.src} style={styles.productImage} />
            <Text>{product.name}</Text>
            <Text>{product.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!showAll && (
        <TouchableOpacity onPress={handleShowAll}>
          <Text style={styles.showAllButton}>Tümünü Gör</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  productContainer: {
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  showAllButton: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
