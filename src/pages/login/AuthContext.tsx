import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';

import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import defaultRegions from "./utils/default-regions.ts";
import AuthToken from "./utils/auth-token.ts";
import {AuthUser} from "./utils/auth-user.ts";
import {clearToken, getToken, isValidRefreshTokenPresent, storeToken} from './utils/auth-storage.ts';
import TOKEN_STORE from "./utils/token-store.ts";
import {sendAuthToken} from "./utils/token-broadcast-channel.ts";
//import jwt_decode from "jwt-decode";

interface AuthContextProps {
    isLoading: boolean;
    isCheckingToken: boolean;
    isAuthenticated: boolean;
    user?: AuthUser;
    login: (email: string, password: string) => void;
    logout: () => void;
    forceLogout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>(undefined!);

const AuthProvider = ({ children }: AuthProviderProps): ReactElement<AuthContextProps> => {
    const { i18n } = useTypeSafeTranslation();

    const [isCheckingToken, setIsCheckingToken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthUser | undefined>();

    const handleNewTokens = (accessToken: string, refreshToken: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            (async () => {
                try {
                    TOKEN_STORE.ACCESS_TOKEN = accessToken;
                    storeToken(refreshToken);
                    sendAuthToken(accessToken);

                   // const decoded = jwt_decode<AuthToken>(accessToken);
                    /*const user: AuthUser = {
                        id: decoded.userId,
                        name: decoded.sub,
                    };*/

                    let language = 'hu';

                    if (defaultRegions[language]) {
                        language = defaultRegions[language];
                    }

                    i18n.changeLanguage(language);
                    setIsAuthenticated(true);
                    setUser(user);

                    resolve();
                } catch (error) {
                    reject();
                }
            })();
        });
    };

    const checkToken = () => {
        if (isValidRefreshTokenPresent()) {
            setIsCheckingToken(true);

            const refreshToken = getToken();

            setIsCheckingToken(false);
        }
    };

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (email: string, password: string) => {
        setIsLoading(true);
    };

    const logout = () => {
        TOKEN_STORE.ACCESS_TOKEN = '';
        clearToken();
        sendAuthToken('');

        setIsAuthenticated(false);
        setUser(undefined);
    };

    const forceLogout = () => {
        TOKEN_STORE.ACCESS_TOKEN = '';
        clearToken();
        sendAuthToken('');

        setIsAuthenticated(false);
        setUser(undefined);
    };

    const contextValue = {
        isCheckingToken,
        isLoading,
        isAuthenticated,
        user,
        login,
        logout,
        forceLogout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

export { AuthProvider, useAuth };
