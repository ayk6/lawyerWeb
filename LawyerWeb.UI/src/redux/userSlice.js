import { createSlice } from "@reduxjs/toolkit"
import { services } from "../services/services";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            console.log("login success")
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        loginFailure: (state) => {
            console.log("login fail")
            state.isLoggedIn = false;
            state.user = null;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            services.encryptedLocalStorage.removeItem("lawyerToken")
        }
    }
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;