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
      headerShown: true, // Set this to false if you want to hide the header for all screens
      headerTitleAlign: 'center', // Align the title to the center
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