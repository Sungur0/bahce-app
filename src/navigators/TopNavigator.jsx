import { View, Text } from 'react-native'
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
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{
          position:'absolute',
          bottom:50,
          left:20,
          right:20,
          elevation:0,
          backgroundColor:'#fff',
          borderRadius:15,
          height:90
        }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}

      />


      <Tab.Screen
        name="Sepetim"
        component={Carts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='shopping-cart' size={size} color={color} />
          )
        }}
      />
       <Tab.Screen
        name="Account"
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