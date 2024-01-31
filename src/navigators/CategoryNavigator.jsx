
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ProductListScreen from '../screens/ProductListScreen';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();



const CategoryNavigator = () => (

  <Tab.Navigator
  
    scrollEnabled={true}
    screenOptions={{
      tabBarScrollEnabled: true,
      tabBarLabelStyle: { fontSize: 13, textTransform: 'capitalize' },
      headerBackTitleStyle: {
        color: '#fff',
      },
      tabBarItemStyle: { width: 100 },
      tabBarIndicatorStyle: { backgroundColor: '#FD8407' },
    
    }}
  >
    <Tab.Screen name="Çiçekler">
      {() => <ProductListScreen category="flowers" />}
    </Tab.Screen>
    <Tab.Screen name="Saksılar">
      {() => <ProductListScreen category="pots" />}
    </Tab.Screen>
    <Tab.Screen name="Topraklar">
      {() => <ProductListScreen category="soils" />}
    </Tab.Screen>
    <Tab.Screen name="Gübreler">
      {() => <ProductListScreen category="fertilizers" />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default CategoryNavigator;
