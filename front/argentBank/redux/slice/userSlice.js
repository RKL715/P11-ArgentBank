import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const userLogin = createAsyncThunk(
'user/login',
    async (userCredentials) => {
        console.log("TEST Credentials :", userCredentials)
        const response = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
        console.log("TEST Response :", response)
        const data = response.data.body;
        localStorage.setItem('token', data.token);
        return data;
    })

const userSlice = createSlice({
    name : 'user',
    initialState: {
        loading : false,
        user : null,
        error : null,
    },
    reducers : {},
    extraReducers :(builder) => {
        builder
            .addCase(userLogin.pending , (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userLogin.fulfilled , (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userLogin.rejected , (state) => {
                state.loading = false;
                state.user = null;
                state.error = 'Invalid credentials';
            })
    }
});

export default userSlice.reducer;