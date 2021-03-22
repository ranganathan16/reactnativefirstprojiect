import * as React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import  ProductStack from './ProductStack';
import  PurchaseStack from './PurchaseStack';
const Drawer = createDrawerNavigator();
export default function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Purchase" screenOptions={{headerShown:true}}>
      <Drawer.Screen name="Product" component={ProductStack}  />
      <Drawer.Screen name="Purchase" component={PurchaseStack} />
    </Drawer.Navigator>
  );
}

