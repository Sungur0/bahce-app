import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useProductContext } from '../context/ProductContext';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useSepet } from '../context/SepetProvider';
import Feather from 'react-native-vector-icons/Feather';


const FlowersScreen = () => {
  const { urunuSepeteEkle } = useSepet();


  
  //   useLayoutEffect(() => {
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
  const { getProductsByCategory } = useProductContext();
  const flowerProducts = getProductsByCategory('flowers');
  const navigation = useNavigation();

  const keyExtractor = (item) => item.id.toString();

  const numColumns = 3;
  const itemWidth = (Dimensions.get('window').width - 30) / numColumns;

  const handleProductPress = (productId) => {
    navigation.navigate('Ürün Detayı', { productId });
  };

  const renderItems = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item.id)}
      style={[styles.itemContainer, { width: itemWidth, marginBottom: 10 }]}
    >
      <TouchableOpacity
        onPress={() => urunuSepeteEkle(item)}

        style={styles.addBtn}
      >
        <Text style={{fontWeight:600}}><Feather name='plus' size={15} color='#80B905' />
        </Text>
      </TouchableOpacity>
      <Image source={item.src}
        style={styles.itemImage} />

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

    </TouchableOpacity>
  );
  return (



    <ScrollView style={styles.container}>

      <FlatList
        data={flowerProducts}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        style={styles.itemList}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 15 }}

      />

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    top: 10,
    right: 2,
    zIndex: 1,
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#80B905',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 3, 
  },
  itemList: {
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    marginHorizontal: 15

  },
  itemContainer: {
    flexDirection: 'column',
    padding: 6,
    flexWrap: 'wrap',
    paddingTop: '5%'

  },
  itemName: {
    textAlign: 'center',
    width: '100%',
    marginLeft: 0,
    fontSize: 13,
  },
  itemImage: {
    width: '100%',
    height: 110,
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

export default FlowersScreen