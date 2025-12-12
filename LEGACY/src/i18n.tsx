import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";


const lng = navigator.language.startsWith("fr") ? "fr" : "en";
console.log("Detected language:", lng);

// bind i18n to react
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        fr: { translation: fr },
    },
    lng: lng, // detect language
    debug: true,
    interpolation: {
        escapeValue: false, // react already escapes
    }
});

export default i18n;