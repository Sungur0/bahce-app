import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useProductContext } from '../context/ProductContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';

const FeaturedProductsScreen = () => {
  const navigation = useNavigation();

  const { featuredProducts } = useProductContext();
  const handleProductPress = (productId) => {
    navigation.navigate('Ürün Detayı', { productId });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginVertical: 15, width: '100', paddingRight: 15 }}>
        <FlatList
          data={featuredProducts}
          numColumns={3}
          style={styles.itemList}

          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleProductPress(item.id)}>

              <View style={{ width: 110, marginRight: 15, }}>
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
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  featuredItem: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginHorizontal: 15
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
});

export default FeaturedProductsScreen;
