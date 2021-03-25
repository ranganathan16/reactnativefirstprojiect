/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import DrawerMenu from './routes/Drawer';
import {Provider} from 'react-redux';
import stores from './store/config/store';
import {PersistGate} from 'redux-persist/integration/react';
import firebase from 'firebase';
const {store, persistor} = stores();

const App: () => React$Node = () => {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: 'AIzaSyCnD1oD24YQY8dWua-2vxT3Ez0keEGlgKE',
      authDomain: 'reactnativecurd-d000c.firebaseapp.com',
      projectId: 'reactnativecurd-d000c',
      storageBucket: 'reactnativecurd-d000c.appspot.com',
      messagingSenderId: '631872274547',
      appId: '1:631872274547:web:dedd355f427e8e5f1daa06',
      measurementId: 'G-EZDLFB77CT',
    };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <DrawerMenu />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
