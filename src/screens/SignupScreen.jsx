// SignUpScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../redux/userSlice';

const backgroundImage = require('../../assets/ekran.jpg');

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

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View>
        <Text>Sign Up Screen</Text>
        <TextInput
          placeholder="İsminizi giriniz"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}

        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          secureTextEntry={false}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}

        />
      
        <Button title="Sign Up" onPress={handleSignUp} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
})


export default SignUpScreen;
