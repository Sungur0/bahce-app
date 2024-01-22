import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Carts from '../screens/Carts';
import Account from '../screens/ AccountScreen';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';



const Tab = createBottomTabNavigator();


const TopNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#80B905',
        tabBarInactiveTintColor:'gray'
      }}

      >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerTitle: (props) => (
            <Image
              resizeMode='center'
              style={{ width: 180, height: 33, resizeMode: 'contain' }}
              source={require('../../assets/logo1.png')}
            />
          ),
        }}

      />


      <Tab.Screen
        name="Sepetim"
        component={Carts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='shopping-cart' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Hesabım"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='user' size={size} color={color} />
          )
        }}
      />
   
    </Tab.Navigator>
  )
}

export default TopNavigator