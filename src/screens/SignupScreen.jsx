// SignUpScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import AppTextInput from "../components/appTextInput";
import Font from "../constants/Font";
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";


const backgroundImage = require('../../assets/background.png');

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('');


  const isEmailValid = () => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {

    if (!isEmailValid()) {
      console.log('Invalid email');
      return; // Do not proceed if email is invalid
    }
    // Eğer gerçek bir üyelik işlemi yapılıyorsa, bu kısmı uygun şekilde güncelleyin.
    // Örneğin, bir API çağrısı kullanabilirsiniz.
    const randomUserId = Math.floor(Math.random() * 1000) + 1;
    // Üyelik işlemi tamamlandıktan sonra isteğe bağlı olarak giriş yapabilirsiniz.
    // Ayrıca, giriş işlemi burada yapılıyor gibi düşünülebilir.
    const userData = {
      userId: randomUserId,
      username: userName, // Gerçek bir kullanıcı adı ekleyin
      email: email,
      password: password,
    };


    // Redux store'a kullanıcıyı ekleyelim
    dispatch(login(userData));

    console.log(userData)

    // Giriş yapıldıktan sonra istediğiniz sayfaya yönlendirme
    navigation.navigate('Login');
  };
  const handleSignIn = () => {
    // Üye olma ekranına yönlendirme
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      {/* <TouchableOpacity onPress={handleSignIn} style={styles.closeButton}>
        <Icon name="close" size={27} color="white" />
      </TouchableOpacity> */}
      <View style={styles.container}>

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
            Üye Ol
          </Animated.Text>
        </View>

        <View style={styles.inputBlock}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()} >

            <AppTextInput
              placeholder="İsminizi giriniz"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).springify()} >

            <AppTextInput placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              secureTextEntry={false}
              keyboardType="email-address"

            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()} >

            <AppTextInput placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry


            />
          </Animated.View>
        </View>




        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.loginBtn}>Hesabını Oluştur</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignIn}
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
            Zaten bir hesabın var mı
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
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },
  light: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputBlock: {
    marginTop: 40,
    marginBottom: 15,
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
  closeButton: {
    position: 'absolute',
    top: hp('3%'),
    left: hp('1%'),
    padding: 10,
  },
})


export default SignUpScreen;
