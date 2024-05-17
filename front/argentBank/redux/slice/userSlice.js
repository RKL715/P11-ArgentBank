import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


// Création d'un thunk asynchrone pour la connexion de l'utilisateur
export const userLogin = createAsyncThunk(
'user/login',
    async (userCredentials, {rejectWithValue}) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
        const data = response.data.body; // récupère les données de l'utilisateur

        sessionStorage.setItem('token', data.token);
        return data; // renvoie les données de l'utilisateur
    }
    catch (error) { // si une erreur se produit
    return rejectWithValue(error.response.data); // renvoie l'erreur
    }
})

// Création d'une Slice pour l'utilisateur
const userSlice = createSlice({
    name : 'user',
    initialState: {
        loading : false,
        user : sessionStorage.getItem('token') ? {} : null, // if token exists, user is logged in
        error : null,
    },
    reducers : {},

    // Ajout des gestionnaires d'action pour le thunk asynchrone
    extraReducers :(builder) => {
        builder
            .addCase(userLogin.pending , (state) => { // si la requête est en cours
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userLogin.fulfilled , (state, action) => { // si la requête est réussie
                state.loading = false;
                state.user = { token:action.payload };
                state.error = null;
            })
            .addCase(userLogin.rejected , (state) => { // si la requête est rejetée
                state.loading = false;
                state.user = null;
                state.error = "Email ou mot de passe incorrect. Veuillez réessayer.";
            })
    }
});

export default userSlice.reducer;