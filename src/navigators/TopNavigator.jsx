import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Carts from '../screens/Carts';
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

    </Tab.Navigator>
  )
}

export default TopNavigator