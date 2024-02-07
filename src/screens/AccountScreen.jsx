import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Font from "../constants/Font";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Octicons'
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/Entypo';


const navigatons = [
  { id: 1, name: 'Adreslerim', icon: <Icon4 name='location' size={19} color='rgba(128, 185, 5,0.8)' /> },
  { id: 2, name: 'Siparişlerim', icon: <Icon2 name='shopping-bag' size={19} color='rgba(128, 185, 5,0.8)' /> },
  { id: 3, name: 'Favorilerim', icon: <Icon5 name='favorite-outline' size={19} color='rgba(128, 185, 5,0.8)' /> },
  { id: 4, name: 'Ödeme yöntemlerim', icon: <Icon4 name='credit-card' size={19} color='rgba(128, 185, 5,0.8)' /> },
  { id: 5, name: 'İletişim Tercihleri', icon: <Icon6 name='bell' size={19} color='rgba(128, 185, 5,0.8)' /> },
  { id: 6, name: 'Hesap Ayarları', icon: <Icon4 name='lock' size={19} color='rgba(128, 185, 5,0.8)' /> },
]

const AccountScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.user.user);

  console.log(userData)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'rgba(128, 185, 5,0.3)', borderBottomWidth: 1, paddingVertical: 5, paddingBottom: 15 }}>

          <Icon name="user" size={60} color='rgba(128, 185, 5,0.8)' style={styles.user} />

          <Text style={styles.text2}> {userData.username}</Text>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'rgba(128, 185, 5,0.3)', borderBottomWidth: 1, paddingVertical: 15 }}>
          <Icon2 name='mail' size={19} color='rgba(128, 185, 5,0.8)'></Icon2>
          <Text style={styles.text}> {userData.email}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'rgba(128, 185, 5,0.3)', borderBottomWidth: 1, paddingVertical: 15 }}>
          <Icon3 name='mobile-alt' size={19} color='rgba(128, 185, 5,0.8)'></Icon3>
          <Text style={styles.text}>{userData.tel}</Text>
        </View>

      </View>

      <View style={styles.main}>

        {navigatons.map((item, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => { navigation.navigate(item.name) }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: 'rgba(128, 185, 5,0.3)', borderBottomWidth: 1, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                  {item.icon}
                  <Text style={styles.text}>{item.name}</Text>
                </View >

                <View>
                  <Icon5
                    name="arrow-forward-ios"
                    type="material"
                    size={15}
                    color='rgba(128, 185, 5,0.8)'
                    iconStyle={{ marginRight: 10 }}
                  />
                </View>

              </View>
            </TouchableOpacity>

          </View>
        ))}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15}}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

            <Icon5
              name="logout"
              type="material"
              size={20}
              color='rgba(128, 185, 5,0.8)'
            />
            <TouchableOpacity onPress={() => { navigation.replace('Login') }}>
              <Text style={styles.text}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>


        </View>

      </View>





    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: Font["poppins-regular"],
    marginHorizontal: 5
  },
  text2: {
    fontFamily: Font["poppins-regular"],
    marginHorizontal: 5,
    fontSize: 18,

  },

  header: {
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  user: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(225, 225, 225, 1)',
    width: 65,
    height: 65,
    textAlign: 'center',
    marginRight: 10
  },
  main: {
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  }
});

export default AccountScreen;
