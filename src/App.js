/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './routes/Drawer';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
  
const Drawer = createDrawerNavigator();
const App: () => React$Node = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer>
      <DrawerMenu />
    </NavigationContainer> 
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
