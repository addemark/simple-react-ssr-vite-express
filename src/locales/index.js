import ro from "./ro/index.js";
import en from "./en/index.js";
import de from "./de/index.js";

const availableTranslation = {
  ro: ro,
  en: en,
  de: de,
};

export const defaultLanguage = "en";
export const availableLanguages = Object.keys(availableTranslation);
export default availableTranslation;
