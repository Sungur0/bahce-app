import { View, Text } from 'react-native'
import React, { useCallback} from 'react'
import { useProductContext } from '../context/ProductContext';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, TouchableOpacity, Image, Dimensions,Button } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Feather from 'react-native-vector-icons/Feather';
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

const FlowersScreen = () => {


 
  const { getProductsByCategory } = useProductContext();
  const flowerProducts = getProductsByCategory('flowers');
  const navigation = useNavigation();

  const keyExtractor = (item) => item.id.toString();

  const numColumns = 3;
  const itemWidth = (Dimensions.get('window').width - 30) / numColumns;

  const handleProductPress = (productId) => {
    if (productId) {
      navigation.navigate('Ürün Detayı', { productId });
    }
  };

  const renderItems = ({ item }) => {
    return(
    <TouchableOpacity
      onPress={() => handleProductPress(item.id)}
      style={[styles.itemContainer, { width: itemWidth, marginBottom: 10 }]}
    >

      <Image source={item.src} style={styles.itemImage} />

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
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
    )
  };
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
    top: 12,
    right: 2,
    zIndex: 2,
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    borderWidth: 0.1,
    borderColor: '#80B905',
    shadowColor: '#80B905',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
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
    padding: 7,
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