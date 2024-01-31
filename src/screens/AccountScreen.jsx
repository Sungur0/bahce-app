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
      <Button
        title="Logout"
        onPress={() => {
          navigation.replace('Login'); 
        }}
      />
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
