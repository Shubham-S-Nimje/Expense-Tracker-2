import { createStore } from "redux";
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

const store = configureStore({
    reducer : { auth : AuthSlice.reducer },
});

export const authActions = AuthSlice.actions;

export default store;
