import { View, Text } from 'react-native'
import React, { useCallback} from 'react'
import { useProductContext } from '../context/ProductContext';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, TouchableOpacity, Image, Dimensions,Button } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Feather from 'react-native-vector-icons/Feather';
import Font from "../constants/Font";
import { commonStyles } from '../commonStyle';



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

  

  const renderItems = ({ item }) => {
    const handleProductPress = (productId) => {
      if (productId) {
        navigation.navigate('Ürün Detayı', { productId });
      }
    };
    return(
    <TouchableOpacity
      onPress={() => handleProductPress(item.id)}
      style={[styles.itemContainer, { width: itemWidth, marginBottom: 10 }]}
    >

      <Image source={item.src} style={styles.itemImage} />

      <View style={commonStyles.priceContainer}>
        {item.discount && (
          <View style={commonStyles.discountContainer}>
            <Text style={commonStyles.discountText}>₺{item.discount}</Text>
          </View>
        )}
        <Text style={[commonStyles.itemPrice, !item.discount && commonStyles.discountedPrice]}>
         ₺{item.price}
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
    fontSize: 13,
    fontFamily: Font["poppins-regular"],
  },
  itemImage: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#dbdbdb',

  },


});

export default FlowersScreen