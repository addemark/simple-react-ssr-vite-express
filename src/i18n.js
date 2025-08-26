import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import validTranslation, {
  defaultLanguage,
  LANG_QUERY,
} from "./locales/index.js";

const resources = {
  //   "ro-RO": { translation: validTranslation.ro },
  //   "en-US": { translation: validTranslation.en },
  ro: { translation: validTranslation.ro },
  en: { translation: validTranslation.en },
};

// Check if we're running on the server
const isServer = typeof window === "undefined";

const i18nConfig = {
  resources,
  fallbackLng: defaultLanguage,
  debug: process.env.NODE_ENV === "development",

  interpolation: {
    escapeValue: false, // React already does escaping
  },

  react: {
    useSuspense: false, // Important for SSR
  },
};

if (!isServer) {
  // Client-side configuration
  const ssrLanguage = window.__SSR_LANGUAGE__;

  if (ssrLanguage && !i18n.isInitialized) {
    // Use SSR language to prevent hydration mismatch - NO language detection
    i18n.use(initReactI18next).init({
      ...i18nConfig,
      lng: ssrLanguage, // Set the language explicitly from SSR
    });

    // Clean up the global variable
    delete window.__SSR_LANGUAGE__;
  } else if (!i18n.isInitialized) {
    // Fallback to normal language detection if no SSR language
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        ...i18nConfig,
        detection: {
          order: ["querystring", "localStorage", "navigator", "htmlTag"],
          lookupQuerystring: LANG_QUERY,
          caches: ["localStorage"],
        },
      });
  }
} else {
  // Server-side configuration
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init(i18nConfig);
  }
}

export default i18n;
