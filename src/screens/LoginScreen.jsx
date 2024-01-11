// LoginScreen.js

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


const backgroundImage = require('../../assets/background.png');

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const storedUserData = useSelector((state) => state.user.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Kullanıcı giriş yapmışsa, home ekranına yönlendirme
    if (isLoggedIn) {
      navigation.replace('Tab');
    } else {
      // Redux store'dan alınan üye bilgileri ile giriş kontrolü
      if (email === storedUserData.email && password === storedUserData.password) {
        // Giriş başarılı ise kullanıcı bilgilerini döndür
        const userData = {
          userId: storedUserData.userId,
          username: storedUserData.username,
          email: storedUserData.email,
        };

        // Redux store'a kullanıcıyı ekleyelim
        dispatch(login(userData));

        // Giriş yapıldıktan sonra home ekranına yönlendirme
        navigation.replace('Tab');
      } else {
        // Giriş başarısız ise hata bilgisi döndür
        Alert.alert('Hata', 'Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.');
      }
    }
  };


  const handleSignUpNavigation = () => {
    // Üye olma ekranına yönlendirme
    navigation.navigate('Signup');
  };


  return (

    <ImageBackground source={backgroundImage} style={styles.background}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

      {/* <KeyboardAvoidingView
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

      <View style={styles.container}>

        <View>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
         >
            Login
          </Animated.Text>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.loginBtn}>Giriş Yap</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff' }}>
          Üye Değil Misiniz? <Text style={{ color: 'blue' }} onPress={handleSignUpNavigation}>Hemen Üye Olun</Text>
        </Text>
      </View>
      {/* </KeyboardAvoidingView> */}
      {/* </TouchableWithoutFeedback> */}
    </ImageBackground>

  );
};

const styles = StyleSheet.create({


  container: {
    
    flex: 1,
    justifyContent:'center',
    paddingTop: 40,
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
    backgroundColor: '#dbdbdb'
  },
  button: {
    elevation: 8,
    backgroundColor: '#80B905',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%'
  },
  loginBtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"

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
});

export default LoginScreen;
