//import jwt_decode from 'jwt-decode';
import AuthToken from "./auth-token.ts";

const TOKEN_STORE = {
    ACCESS_TOKEN: '',
};

export const isAccessTokenValid = () => {
    if (TOKEN_STORE.ACCESS_TOKEN) {
       // const decoded = jwt_decode<AuthToken>(TOKEN_STORE.ACCESS_TOKEN);
        //return decoded.exp > new Date().getTime() / 1000;
    }

    return false;
};
export default TOKEN_STORE;
