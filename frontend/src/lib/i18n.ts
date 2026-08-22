import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          greeting: "Hello, welcome!",
        },
      },
      fr: {
        translation: {
          greeting: "Bonjour, bienvenue!",
        },
      },
      hi: {
        translation: {
          greeting: "नमस्ते, स्वागत है!",
        },
      },
    },
  });

export default i18n;
