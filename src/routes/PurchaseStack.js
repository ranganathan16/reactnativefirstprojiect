import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PurchaseList from '../screens/PurchaseList';
import AddPurchaseOrder from '../screens/AddPurchaseOrder';
const Stack = createStackNavigator();

export default function Productstack() {
  return (
    <Stack.Navigator
      initialRouteName="PurchaseList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PurchaseList" component={PurchaseList} />
      <Stack.Screen name="AddPurchaseOrder" component={AddPurchaseOrder} />
    </Stack.Navigator>
  );
}
