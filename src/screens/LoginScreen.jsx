// LoginScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/appTextInput";
import Font from "../constants/Font";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backgroundImage = require('../../assets/background.png');




const LoginScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        // AsyncStorage'den kullanıcı bilgilerini al
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          const userData = JSON.parse(userToken);

          // Redux store'a kullanıcı bilgilerini ekleyerek oturumu başlat
          dispatch(login(userData));
        }
      } catch (error) {
        console.error('Error initializing user', error);
      }
    };

    // Uygulama başlangıcında AsyncStorage'den kullanıcı bilgilerini yükle
    loadStoredUser();
  }, [dispatch]);

  const handleLogin = async () => {
    // Kullanıcı giriş yapmışsa, home ekranına yönlendirme
    if (isLoggedIn) {
      navigation.replace('Tab');
    } else {
      try {
        // AsyncStorage'den kullanıcı bilgilerini al
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          const userData = JSON.parse(userToken);

          // Kullanıcının girdiği bilgilerle AsyncStorage'ten çekilen bilgileri karşılaştır
          if (email === userData.email && password === userData.password) {
            // Giriş başarılı ise kullanıcı bilgilerini Redux store'a ekleyelim
            dispatch(login(userData));

            // Giriş yapıldıktan sonra home ekranına yönlendirme
            navigation.replace('Tab');
          } else {
            // Giriş başarısız ise hata mesajı göster
            Alert.alert('Hata', 'Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.');
          }
        } else {
          // Kayıtlı kullanıcı bilgisi bulunamadı
          Alert.alert('Hata', 'Kayıtlı kullanıcı bilgisi bulunamadı.');
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    }
  };


  const handleSignUpNavigation = () => {
    navigation.navigate('Signup');
  };


  return (

    <ImageBackground source={backgroundImage} style={styles.background}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        > */}
      <Animated.View style={styles.light}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require('../../assets/light.png')}
          style={{ height: 225, width: 90, opacity: 1 }}

        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1100).springify()}
          source={require('../../assets/light.png')}
          style={{ height: 160, width: 65, opacity: 0.75 }}
        />

      </Animated.View>


      <View style={{ top: 0, alignItems: 'center', }}>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={{
            fontSize: 24, color: '#fff',
            fontFamily: Font["poppins-bold"],
          }}
        >
          Giriş Yap
        </Animated.Text>
      </View>


      <View style={styles.container}>
        <View style={styles.inputBlock}>

          <Animated.View
            entering={FadeInDown.duration(1000).springify()} >

            <AppTextInput placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()} >
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry />
          </Animated.View>
        </View>
 

        <Text style={{
          alignSelf: 'flex-end',
          fontFamily: Font["poppins-regular"],
          color: '#80B905',
        }}>
          Şifreni mi unuttun?</Text>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.loginBtn}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUpNavigation}
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: '#2C373D',
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Yeni hesap oluştur
          </Text>
        </TouchableOpacity>


        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            color: '#80B905',
            textAlign: "center",
            fontSize: 13,
          }}
        >
          Ya da şununla devam et :
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#DBDBDB',
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="logo-google"
              color='#060606'
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#DBDBDB',
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="logo-apple"
              color='#060606'
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#DBDBDB',
              borderRadius: 5,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="logo-facebook"
              color='#060606'
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAvoidingView>
      </TouchableWithoutFeedback> */}
    </ImageBackground>

  );
};

const styles = StyleSheet.create({


  container: {
    marginHorizontal: 10,
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    color: '#fff',
    height: 40,
    borderColor: '#fff',
    borderRadius: 9,
    margin: 10,
    padding: 10,
    backgroundColor: '#dbdbdb'
  },
  focusedInput: {
    borderColor: '#80B905',
    borderWidth: 1,

  },
  button: {
    elevation: 8,
    backgroundColor: '#80B905',
    borderRadius: 10,
    padding: 15,
    marginVertical: 25,
    shadowColor: '#80B905',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  loginBtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: Font["poppins-bold"],

  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  light: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputBlock: {
    marginTop: 40,
    marginBottom: 15,
  }
});

export default LoginScreen;
