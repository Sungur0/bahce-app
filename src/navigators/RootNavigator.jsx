import React from 'react';
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';
import { View, Text, } from 'react-native'
import { Button } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import Carts from '../screens/Carts';
import TopNavigator from './TopNavigator';
import CategoryNavigator from './CategoryNavigator';
import FeaturedProductsScreen from '../screens/FeaturedProducts';
import SignUpScreen from '../screens/SignupScreen';
import ShoppingPay from '../screens/ShoppingPay';
import OrderSucces from '../screens/OrderSucces';
import Orders from '../screens/Orders'
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const userId = useSelector((state) => state.user.user.userId);

    const cart = useSelector((state) => state.cart[userId] || []);


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
                options={{ headerShown: false, }}
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
                    headerTintColor: '#fff',
                    headerRight: () => (
                        cart.length > 0 ? (
                            <View>
                                <View style={{ borderRadius: 50, backgroundColor: 'rgba(253, 132, 7, 1)', width: 16, height: 16, position: 'absolute', alignItems: 'center', right: '0%', zIndex: 1 }}>
                                    <Text style={{ color: '#fff', fontSize: 12 }}>{cart.length}</Text>
                                </View>
                                <Button
                                    onPress={() => navigation.navigate('Sepetim')}
                                    type='clear'
                                    icon={<Icon2 name="shopping-basket" size={18} color="white" />}
                                    style={{ marginLeft: 0 }}
                                />
                            </View>
                        ) : null
                    )
                }}
            />
            <Stack.Screen
                name="Öne Çıkarılan Ürünler"
                component={FeaturedProductsScreen}
                options={{
                    headerTitle: 'Öne Çıkarılan Ürünler',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Ödeme Yap"
                component={ShoppingPay}
                options={{
                    headerStyle: {
                        backgroundColor: '#80B905',
                    },
                    headerTintColor: '#fff',
                    animation: 'slide_from_right',

                }}

            />
            <Stack.Screen name="Sipariş Tamamlama" component={OrderSucces} options={{ headerShown: false, animation: 'slide_from_bottom', }} />
            <Stack.Screen name="Siparişlerim" component={Orders} options={{ headerShown: true, animation: 'slide_from_right', }} />


        </Stack.Navigator>
    );
}
