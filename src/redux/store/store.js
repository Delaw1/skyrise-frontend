import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
// import throttle from 'lodash/throttle'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const loggerMiddleware = createLogger()

const persistConfig = {
    key: 'root',
    storage: storage,
    // whitelist: ['developers'] // which reducer want to store
  };
let persistedReducer =  persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk, loggerMiddleware))
export const persistor = persistStore(store)