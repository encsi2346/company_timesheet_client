//import jwt_decode from 'jwt-decode';
import AuthToken from "./auth-token.ts";

export const getToken = () => {
    //return localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
};

export const storeToken = (token: string) => {
    //localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY, token);
};

export const clearToken = () => {
    //localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
};

export const isValidRefreshTokenPresent = () => {
    const token = getToken();

    if (token) {
        //const decoded = jwt_decode<AuthToken>(token);
        //return decoded.exp > new Date().getTime() / 1000;
    }

    return false;
};
