import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);

  return {store, persistor};
};
