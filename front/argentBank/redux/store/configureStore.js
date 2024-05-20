import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from '../slice/userSlice';
import sessionStorage from "redux-persist/es/storage/session";


const persistConfig = {
    key : 'root',
    storage : sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, userSlice);


const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }),
    devTools : true
});

export default store;
export const persistor = persistStore(store);