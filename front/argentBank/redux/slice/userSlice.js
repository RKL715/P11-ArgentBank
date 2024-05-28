import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


// Initialisation de l'état de l'utilisateur
const initialState = {
    loading : false,
    user : {
        token: sessionStorage.getItem('token') || null , // if token exists, user is logged in, else token is null
        userName : null,
        email : null,
    },
    error : null,
}

// Création d'un thunk asynchrone pour la connexion de l'utilisateur
export const userLogin = createAsyncThunk(
'user/login',
    async (userCredentials, {rejectWithValue}) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
        const data = response.data; // récupère les données de l'utilisateur
        sessionStorage.setItem('token', data.body.token);

        // Fetch profile
        const profileResponse = await axios.post('http://localhost:3001/api/v1/user/profile', {},{
            headers : { Authorization : `Bearer ${data.body.token}` }
        });

        return {
            ...data.body,
            userName : profileResponse.data.body.userName,
            profile : profileResponse.data.body,
        };
    }
    catch (error) { // si une erreur se produit
        console.log ("error", error.response.data);
    return rejectWithValue(error.response.data); // renvoie l'erreur
    }
})

// Création d'une Slice pour l'utilisateur
const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
               // Ajout d'un gestionnaire d'action pour la déconnexion de l'utilisateur
        userLogout : (state) => {
            console.log('userLogout called');
            sessionStorage.removeItem('token');
             state.user = { token : null, username : null, email : null};
        }
    },


        // Ajout des gestionnaires d'action pour le thunk asynchrone
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
            // addCase pour userLogout
            // .addCase(userLogout.pending , (state) => {
            //     state.loading = true;
            //     state.user = null;
            //     state.error = null;
            // })
            // .addCase(userLogout.fulfilled , (state) => {
            //     state.loading = false;
            //     state.user = null;
            //     state.error = null;
            // })
        },
    }
)

// export des actions
export const {  userLogout } = userSlice.actions;
// export du reducer
export default userSlice.reducer;
// export du sélecteur
export const selectUser = (state) => state.user || initialState ;