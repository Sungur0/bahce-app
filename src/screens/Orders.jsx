import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Font from "../constants/Font";
import Icon from 'react-native-vector-icons/AntDesign';


export default function Orders() {
  const orders = useSelector((state) => state.order.orders);
  console.log(orders)

  function formatTarih(tarihDamgasi) {
    const tarih = new Date(tarihDamgasi);
    const gun = tarih.getDate();
    const ay = tarih.toLocaleString('tr-TR', { month: 'long' });
    const yil = tarih.getFullYear();
    return `${gun} ${ay} ${yil}`;
  }

  return (
    <ScrollView style={{ flex: 1, width: '100%', paddingVertical: 20 }}>
      <View style={styles.itemContainer}>

        <View style={{ flex: 1, width: '100%', paddingVertical: 10, }}>

          {orders.map((order, index) => (
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 6, }} key={index}>
              <View style={{ width: '95%', backgroundColor: '#fff', borderRadius: 2, flexDirection: 'column', position: 'relative', }}>


                <View style={{ paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.fontText}>{formatTarih(order.date)}</Text>
                    <Text style={styles.fontText}>Toplam: <Text style={{ color: 'rgba(128, 185, 5,0.6)' }}>{order.total}₺</Text></Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity>
                      <Text style={{ fontFamily: Font["poppins-regular"], }}>     <Icon
                        name="like2"
                        type="material"
                        color='#80B905'
                        size={16}
                        iconStyle={{ marginRight: 10 }}
                      /> Sipariş Alındı </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View  >

                  <View style={{ borderTopWidth: 1, borderColor: 'rgba(239, 236, 236, 0.9)', flexDirection: 'column' ,paddingVertical:10}}>
                    <View style={{ flexDirection: 'column' }}>
                      <View style={{ flexDirection: 'row', }}>
                        {order.products.map((product, productIndex) => (
                          <View key={productIndex} style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                              <Image source={product.src} style={styles.itemImage} />
                            </View>


                          </View>
                        ))}
                      </View>

                      <View style={{ paddingHorizontal: 10 }}>
                        <Text style={[styles.fontText, { color: 'rgba(225, 225, 225, 1)' }]}>{order.products.length} ürün siparişi alındı</Text>

                      </View>
                    </View>


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
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(239, 236, 236, 0.5)',
    borderRadius: 12,
  },
  fontText: {
    fontFamily: Font["poppins-regular"],
    paddingVertical: 1
  }
})




