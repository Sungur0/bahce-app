
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FlowersScreen from '../screens/FlowersScreen'; // Örnek: "Çiçekler" ekranı
import PotsScreen from '../screens/PotsScreen'; // Örnek: "Saksılar" ekranı
import SoilScreen from '../screens/SoilScreen'; // Örnek: "Topraklar" ekranı
import FertilizersScreen from '../screens/FertilizersScreen'; // Örnek: "Gübreler" ekranı
import Products from '../screens/Products';

const Tab = createMaterialTopTabNavigator();

const CategoryNavigator = () => (
  <Tab.Navigator
  scrollEnabled={true}
  screenOptions={{
    tabBarScrollEnabled: true,
    tabBarLabelStyle: { fontSize: 13, textTransform: 'capitalize' },
    tabBarItemStyle: { width: 100 },
    tabBarIndicatorStyle: { backgroundColor: '#FD8407' },
  }}
>
    <Tab.Screen name="Çiçekler" component={FlowersScreen} />
    <Tab.Screen name="Saksılar" component={PotsScreen} />
    <Tab.Screen name="Topraklar" component={SoilScreen} />
    <Tab.Screen name="Gübreler" component={FertilizersScreen} />
  </Tab.Navigator>
);

export default CategoryNavigator;
