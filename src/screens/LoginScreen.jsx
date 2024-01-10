// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../redux/userSlice';

const backgroundImage = require('../../assets/ekran.jpg');

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Eğer gerçek bir giriş işlemi yapılıyorsa, bu kısmı uygun şekilde güncelleyin.
    // Örneğin, bir API çağrısı kullanabilirsiniz.
    // Burada sadece örnek bir kullanım gösterilmektedir.

    const userData = {
      userId: 1,
      username: 'exampleUser',
      email: 'bahce@gmail.com',
      password:'123'
    };

    dispatch(login(userData));

    // Giriş yapıldıktan sonra home ekranına yönlendirme
    if (isLoggedIn) {
      // Kullanıcı zaten giriş yapmışsa, home ekranına yönlendirme
      navigation.replace('Tab');
      return null;
    }
  };
  const handleSignUpNavigation = () => {
    // Üye olma ekranına yönlendirme
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container} >
        <Text  style={{color:'#fff'}}> Login Screen</Text>
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
        <Button title="Login" onPress={handleLogin} />
        <Text style={{color:'#fff'}}>
          Üye Değil Misiniz? <Text style={{ color: 'blue' }} onPress={handleSignUpNavigation}>Hemen Üye Olun</Text>
        </Text>
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
    color:'#fff',
    height: 40,
    borderColor: '#fff',
    borderRadius:9,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },
});

export default LoginScreen;
