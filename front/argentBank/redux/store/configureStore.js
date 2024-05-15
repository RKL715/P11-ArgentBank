import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice.js';

const store = configureStore({
    reducer : {
        user : userReducer
    },
    devTools : true
})

export default store;