import React from 'react';
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import Carts from '../screens/Carts';
import '../screens/Products'
import { View, Image } from 'react-native';
import TopNavigator from './TopNavigator';
import CategoryNavigator from './CategoryNavigator';
import FeaturedProductsScreen from '../screens/FeaturedProducts';
import SignUpScreen from '../screens/SignupScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (

        <Stack.Navigator initialRouteName={isLoggedIn ? 'Tab' : 'Login'} screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'grey',
            animation: 'slide_from_bottom',
            gestureEnabled: true,
            transitionSpec: {
                open: { animation: 'slide_from_bottom', config: { duration: 150 } },
                close: { animation: 'slide_from_bottom', config: { duration: 50 } },
            },
        }} >
            <Stack.Screen name="Tab"
                component={TopNavigator}
                options={{    headerShown: false,}}
            />
            <Stack.Screen name="Ürün Detayı" component={DetailsScreen} options={{
                tabBarButton: () => null,
                tabBarVisible: false,
                headerStyle: {
                    backgroundColor: '#80B905',                    
                },
                animation: 'fade_from_bottom',
                headerTitleStyle: {
                    color: '#fff', 
                  },

            }} />
            <Stack.Screen name="Sepetim" component={Carts} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false, animation: 'fade_from_bottom' }} />


            <Stack.Screen
                name="Ürünlerim"
                component={CategoryNavigator}
                options={{
                    headerTitle: 'Ürünler',
                    headerBackTitleVisible: false,
                    animation: 'slide_from_right',
                    headerStyle: {
                        backgroundColor: '#80B905',                    
                    },      
                    headerTitleStyle: {
                        color: '#fff', 
                      },
                     
                }}
            />
            <Stack.Screen
                name="Öne Çıkarılan Ürünler"
                component={FeaturedProductsScreen}
                options={{
                    headerTitle: 'Öne Çıkarılan Ürünler',
                    headerBackTitleVisible: false,
                    // animation: 'slide_from_right',
                    headerTitleStyle: {
                        color: '#fff', 
                      },
               
                }}
            />

        </Stack.Navigator>
    );
}
