import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Font from "../constants/Font";

export default function Orders() {
  const orders = useSelector((state) => state.orders);
  console.log(orders)

  return (
    <View>
      <Text>Orders</Text>
    </View>
  )
}





