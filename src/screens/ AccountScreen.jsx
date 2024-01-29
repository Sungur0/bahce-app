import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const AccountScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.user.user);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate('Siparişlerim') }}>
        <Text>Siparişlerim</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
        <Text>
          Home
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Account Screen</Text>
      <Text style={styles.text}>Kullanıcı Adı: {userData.username}</Text>
      <Text style={styles.text}>E-posta: {userData.email}</Text>
      {/* Diğer kullanıcı bilgilerini ekleyebilirsiniz */}
      {/* <Button
        title="Logout"
        onPress={() => {
          // Örneğin: dispatch(logout());
          // Bu örnekte dispatch fonksiyonunu kullanmıyorsunuz, ama gerçek uygulamada kullanmanız önerilir.
          navigation.replace('Login'); // Login ekranına yönlendirme
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default AccountScreen;
