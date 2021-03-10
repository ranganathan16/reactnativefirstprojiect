import * as React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import  ProductStack from './ProductStack';

const Drawer = createDrawerNavigator();
export default function DrawerMenu() {
  return (
    <Drawer.Navigator screenOptions={{headerShown:true}}>
      <Drawer.Screen name="Product" component={ProductStack}  />
      <Drawer.Screen name="Product123" component={ProductStack} />
    </Drawer.Navigator>
  );
}

