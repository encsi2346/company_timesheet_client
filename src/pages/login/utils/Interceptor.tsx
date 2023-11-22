/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {useAuth} from "../AuthContext.tsx";
import {useTypeSafeTranslation} from "../../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import TOKEN_STORE, {isAccessTokenValid} from "./token-store.ts";
import {isValidRefreshTokenPresent} from "./auth-storage.ts";

const nonAuthenticatedUrls = [
    `/login/email`,
    `/logout`,
];

let isRefreshing = false;

const Interceptor = () => {
    const { forceLogout } = useAuth();
    const { t } = useTypeSafeTranslation();
    const { t: translate } = useTranslation();
    const errorInterceptor = useRef<number>();
    const authInterceptor = useRef<number>();

    const addAuthInterceptor = () => {
                let shouldCancel = false;

                if (!isAccessTokenValid()) {
                    const logoutUser = () => {
                        shouldCancel = true;
                        forceLogout();
                        isRefreshing = false;
                    };

                    if (isValidRefreshTokenPresent()) {
                        try {
                            if (!isRefreshing) {
                                isRefreshing = true;

                                isRefreshing = false;
                            }
                        } catch {
                            logoutUser();
                            isRefreshing = false;
                        }
                    } else {
                        logoutUser();
                        isRefreshing = false;
                    }
                }

                const token = TOKEN_STORE.ACCESS_TOKEN;

                return {
                    cancelToken: new axios.CancelToken((cancel) => {
                        if (shouldCancel) {
                            cancel();
                        }
                    }),
                };
    };


    const removeAuthInterceptor = () => {
        if (authInterceptor.current) {
            authInterceptor.current = undefined;
        }
    };

    const removeErrorInterceptor = () => {
        if (errorInterceptor.current) {
            errorInterceptor.current = undefined;
        }
    };

    useEffect(() => {
        addAuthInterceptor();

        return () => {
            removeAuthInterceptor();
            removeErrorInterceptor();
        };
    }, []);

    return null;
};

export default Interceptor;
