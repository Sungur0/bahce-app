import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Font from "../constants/Font";


export default function Orders() {
  const orders = useSelector((state) => state.order.orders);
  console.log(orders)
  return (
    <ScrollView style={{ flex: 1, width: '100%', paddingVertical: 20 }}>
      <View style={styles.itemContainer}>

        <View style={{ flex: 1, width: '100%', paddingVertical: 10, }}>

          {orders.map((order, index) => (
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 6, }} key={index}>
              <View style={{ width: '95%', backgroundColor: '#fff', borderRadius: 2, flexDirection: 'column', position: 'relative', paddingHorizontal: 10 }}>


                <View style={{paddingVertical:10,}}>
                  <View>
                  <Text>{order.date}</Text>
                  <Text>Toplam: {order.total}₺</Text>
                  </View>
                  

                </View>
                <View  >

                  <View>
                    {order.products.map((product, productIndex) => (
                      <View key={productIndex} style={{ flexDirection: 'row' }}>
                        <Image source={product.src} style={styles.itemImage} />
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }}>
                          <Text>{product.name}</Text>
                          <Text>{product.price}</Text>
                        </View>


                      </View>
                    ))}
                  </View>
                 
                </View>
              </View>

            </View>




          ))}
        </View>

      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'rgba(239, 236, 236, 0.5)',
    borderRadius: 12,
  }
})




