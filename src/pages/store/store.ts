import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import motoReducer from './slices/motoSlice';
import productsReducer from './slices/prodSlice';

const rootReducer = combineReducers({
    user: userReducer,
    motos: motoReducer,
    products: productsReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], 
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