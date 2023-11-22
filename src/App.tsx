import { BrowserRouter } from "react-router-dom";
import Router from "./Router.tsx";
import "./index.css";
import {Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {themeSettings} from "./theme.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import useLocaleLoader from "./components/inputFields/hooks/useLocaleLoader.tsx";
import NiceModal from "@ebay/nice-modal-react";
import "./i18n.ts";
import {AuthProvider} from "./pages/login/AuthContext.tsx";
import Interceptor from "./pages/login/utils/Interceptor.tsx";

const App = () => {
    const locale=useLocaleLoader();

    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
    <>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                    <BrowserRouter>
                        <NiceModal.Provider>
                            <AuthProvider>
                                <CssBaseline />
                                <Interceptor />
                                <Router isAuth={isAuth}/>
                            </AuthProvider>
                        </NiceModal.Provider>
                    </BrowserRouter>
                </LocalizationProvider>
            </ThemeProvider>
    </>
  );
}

export default App;
