import { BrowserRouter } from "react-router-dom";
import Router from "./Router.tsx";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {themeSettings} from "./theme.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import useLocaleLoader from "./components/inputFields/hooks/useLocaleLoader.tsx";

const App = () => {
    const locale=useLocaleLoader();

    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
    <>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                    <CssBaseline />
                    <Router isAuth={isAuth}/>
                </LocalizationProvider>
            </ThemeProvider>
        </BrowserRouter>
    </>
  );
}

export default App;
