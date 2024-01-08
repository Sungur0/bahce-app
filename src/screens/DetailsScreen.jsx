import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const DetailScreen = () => {
  const { products } = useProductContext();

  const route = useRoute();
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = route.params;
  const navigation = useNavigation();


  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    // setSelectedImage(null);
    setLightboxVisible(false);
  };
  const handleImageLoad = () => {
    setLoading(false);
  };




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



        <View >
          {product.models && product.models.length > 0 ? (
            <Swiper
              style={{ height: 300, backgroundColor: '#fff' }}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
              loop={false}
              paginationStyle={{ bottom: 5 }}
            >
              {product.models.map((model, index) => (
                <TouchableOpacity key={index} onPress={() => openLightbox(model)}>
                  <View style={{ height: 300 }}>
                    <Image source={model} style={{ height: 300, objectFit: 'contain', alignSelf: 'center' }} />
                  </View>
                </TouchableOpacity>
              ))}
            </Swiper>
          ) : (
            
            <TouchableOpacity onPress={() => openLightbox(product.src)}>
            <View style={{ height: 300, backgroundColor: '#fff' }}>
              <Image source={product.src} style={{ height: 300, objectFit: 'contain', alignSelf: 'center' }} />
            </View>
          </TouchableOpacity>
          )}


        </View>
        <Modal
          isVisible={lightboxVisible}
          // onBackdropPress={closeLightbox}
          onBackButtonPress={closeLightbox}
          animationIn ='fadeIn'
          animationInTiming={1000}
          animationOut='fadeOut'
          animationOutTiming= {400}
          style={styles.modal}
          backdropOpacity={1}
        >
          <View>
            <TouchableOpacity onPress={closeLightbox} style={styles.closeButton}>
              <Icon name="close" size={27} color="white" />
            </TouchableOpacity>
            <Image source={selectedImage} style={{ height: 300, resizeMode: 'contain',backgroundColor:'#fff', alignSelf: 'center', }} />

          </View>
        </Modal>




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
    position: 'relative'
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
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  productDetail: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  }, activeDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#80B905'
  },
  closeButton: {
    position: 'absolute',
    top: hp('-25%'),
    left: hp('0%'),
    padding: 10,
  },
});

export default DetailScreen;