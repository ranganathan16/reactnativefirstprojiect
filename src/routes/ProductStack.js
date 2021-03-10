import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductList from '../screens/ProductList';
import AddProduct from '../screens/AddProduct';

const Stack = createStackNavigator();

export default function Productstack() {
  return (
   
      <Stack.Navigator initialRouteName="AddProduct" screenOptions={{headerShown:false}}>
          <Stack.Screen name="ProductList" component={ProductList} />       
          <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>

  );
}

