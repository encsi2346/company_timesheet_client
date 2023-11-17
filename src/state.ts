import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    language: "hu",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setLanguage: (state, action) => {
            state.language = action.payload.language;
        },
    }
})

export const { setMode, setLogin, setLogout, setLanguage } = authSlice.actions;
export default authSlice.reducer;