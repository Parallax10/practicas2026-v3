import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import motoReducer from './slices/motoSlice';
import productsReducer from './slices/prodSlice';
import favsReducer from './slices/favsSlice';
import carritoReducer from './slices/carritoSlice'

const rootReducer = combineReducers({
    user: userReducer,
    motos: motoReducer,
    products: productsReducer,
    favoritos:favsReducer,
    carrito:carritoReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','favoritos','carrito'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
        serializableCheck: false, 
        }),
    });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];