import {useEffect, useState} from "react";
import {LoginRequest, UsersClient} from "../api-client.ts";
import {BackendUrl} from "../App.tsx";


export function useAuthentication() {

    const [authInfo, setAuthInfo] = useState({
        isAuthenticated: null,
        userEmail: null,
        accessToken: null,
        accessTokenExpirationDate: null,
        refreshToken: null
    });

    useEffect(() => {
        if (authInfo.isAuthenticated === null) {
            const authInfoFromLocalStorage = localStorage.getItem("authInfo");
            if (authInfoFromLocalStorage) {
                setAuthInfo(JSON.parse(authInfoFromLocalStorage));
            } else {
                setAuthInfo({
                    isAuthenticated: false,
                    userEmail: null,
                    accessToken: null,
                    accessTokenExpirationDate: null,
                    refreshToken: null
                });
            }
        }
    }, [authInfo]);

    const login = (email, password) => {
        const usersClient = new UsersClient(BackendUrl);
        return usersClient.login(false, false, new LoginRequest({ email: email, password: password }))
            .then(response => {
                const newAuthInfo = {
                    isAuthenticated: true,
                    userEmail: email,
                    accessToken: response.accessToken,
                    accessTokenExpirationDate: new Date().getTime() + response.expiresIn * 1000,
                    refreshToken: response.refreshToken
                };
                localStorage.setItem("authInfo", JSON.stringify(newAuthInfo));
                setAuthInfo(newAuthInfo);
            });
    };

    const logout = () => {
        localStorage.removeItem("authInfo");
        setAuthInfo({
            isAuthenticated: false,
            userEmail: null,
            accessToken: null,
            accessTokenExpirationDate: null,
            refreshToken: null
        });
    }

    const fetchFunction = !authInfo.isAuthenticated
        ? fetch
        : (url, options) => { options.headers['Authorization'] = 'Bearer ' + authInfo.accessToken; return fetch(url, options); }

    return {
        isAuthenticated: authInfo.isAuthenticated,
        userEmail: authInfo.userEmail,
        login: login,
        logout: logout,
        http: { fetch: fetchFunction }
    };
}