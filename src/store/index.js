import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false }

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers : {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    }
});

const initialthemeState = { isDarkmode: false }

const ThemeSlice = createSlice({
    name: 'thememodechange',
    initialState: initialthemeState,
    reducers : {
        Darkmode(state) {
            state.isDarkmode = true;
            // console.log('Darkmode')
        },
        Lightmode(state) {
            state.isDarkmode = false;
            // console.log('Lightmode')
        },
    }
});

const store = configureStore({
    reducer : { auth : AuthSlice.reducer, theme : ThemeSlice.reducer },
});

export const authActions = AuthSlice.actions;
export const ThememodeActions = ThemeSlice.actions;

export default store;