import {createContext, ReactElement, ReactNode, useContext, useEffect, useState} from "react";
import {LoginRequest, UsersClient,RefreshRequest} from "../api-client.ts";
import {BackendUrl} from "../App.tsx";

const AuthContext = createContext<AuthContextProps>(undefined!);

interface AuthContextProps {
    isAuthenticated: boolean,
    userEmail: string | null,
    login: (email: string, password: string) => void,
    logout: () => void,
    http: { fetch: (url: string, options: any) => Promise<Response> }
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): ReactElement<AuthContextProps> => {
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
                console.log("Parsing authInfo from local storage. Should appear ONLY ONCE PER PAGE LOAD");
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
    
    const secureFetch = async (url, options) => {
        if (!authInfo.isAuthenticated) {
            throw new Error("Not authenticated");
        } else {
            if (authInfo.accessTokenExpirationDate < new Date().getTime()) {
                console.log("Access token expired. Refreshing...");
                const usersClient = new UsersClient(BackendUrl);
                const refreshResult = await usersClient.refresh(new RefreshRequest({ refreshToken: authInfo.refreshToken }));
                authInfo.accessToken = refreshResult.accessToken;
                authInfo.accessTokenExpirationDate = new Date().getTime() + refreshResult.expiresIn * 1000;
                refreshResult.refreshToken && (authInfo.refreshToken = refreshResult.refreshToken);
                localStorage.setItem("authInfo", JSON.stringify(authInfo));
                setAuthInfo(authInfo);
            }
        }
        options.headers['Authorization'] = 'Bearer ' + authInfo.accessToken;
        return await fetch(url, options);
    }

    const fetchFunction = !authInfo.isAuthenticated
        ? fetch
        : secureFetch

    const contextValue = {
        isAuthenticated: authInfo.isAuthenticated,
        userEmail: authInfo.userEmail,
        login: login,
        logout: logout,
        http: { fetch: fetchFunction }
    };
    
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

const useAuthentication = (): AuthContextProps => useContext(AuthContext);

export { AuthProvider, useAuthentication };

