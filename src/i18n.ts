import i18n from "i18next";
import Backend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'hu', //TODO: this change the language
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        }
    });

export default i18n;