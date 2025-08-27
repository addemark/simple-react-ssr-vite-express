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
  console.log("88888888", ssrLanguage);

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
        react: { useSuspense: false },
        detection: {
          order: [
            "querystring",
            "localStorage",
            "cookie",
            "navigator",
            "htmlTag",
          ],
          lookupQuerystring: "lang",
          caches: ["localStorage", "cookie"], // <— persist language here
          // Keys (defaults shown)
          lookupLocalStorage: "i18nextLng",
          lookupCookie: "i18next",
          cookieMinutes: 60 * 24 * 365, // 1 year
          cookieSameSite: "lax",
          // Clean/normalize the detected value
          cleanCode: true, // strips spaces, normalizes case
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
