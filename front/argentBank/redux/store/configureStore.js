import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../slice/userSlice';


const persistConfig = {
    key : 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice);


const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware ({
        serializableCheck : false
    }),
    devTools : true
});

export default store;
export const persistor = persistStore(store);