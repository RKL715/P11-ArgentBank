import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// INITIAL STATE pour l'utilisateur
const initialState = {
    loading : false,
    user : {
        token: sessionStorage.getItem('token') || null , // if token exists, user is logged in, else token is null
        userName : null,
        email : null,
    },
    error : null,
}

// CREATE ASYNC THUNK pour la connexion de l'utilisateur
export const userLogin = createAsyncThunk(
'user/login',
    async (userCredentials, {rejectWithValue}) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
        const data = response.data; // récupère les données de l'utilisateur
        sessionStorage.setItem('token', data.body.token);

        // FETCH PROFILE
        const profileResponse = await axios.post('http://localhost:3001/api/v1/user/profile', {},{
            headers : { Authorization : `Bearer ${data.body.token}` }
        });
        return {
            ...data.body,
            userName : profileResponse.data.body.userName,
            profile : profileResponse.data.body,
        };
    }
    catch (error) {
    return rejectWithValue(error.response.data);
    }
})

// CREATE SLICE pour l'utilisateur
const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
               // ADD REDUCER for userLogout
        userLogout : (state) => {
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
             state.user = initialState.user;
        },
             // ADD REDUCER for updateUserName
        updateUserName : (state, action) => {
            state.user.userName = action.payload;
        }
    },

        // ADD EXTRA REDUCERS
        extraReducers :(builder) => {
            builder
                // addCase pour userLogin
                .addCase(userLogin.pending , (state) => { // si la requête est en cours
                    state.loading = true;
                    state.user = null;
                    state.error = null;
                })
                .addCase(userLogin.fulfilled , (state, action) => { // si la requête est réussie
                    state.loading = false;
                    state.user =
                        action.payload  ;
                    state.error = null;
                })
                .addCase(userLogin.rejected , (state, action) => { // si la requête est rejetée
                    state.loading = false;
                    state.user = null;
                    state.error = action.error.message
                })
        },
    }
)

// export des actions
export const {  userLogout, updateUserName } = userSlice.actions;
// export du reducer
export default userSlice.reducer;
// export du sélecteur
export const selectUser = (state) => state.user || initialState ;