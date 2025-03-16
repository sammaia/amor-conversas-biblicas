// This is a simple placeholder for the i18n library.
// We're not actually using react-i18next but keeping our own translations system
const i18n = {
  language: "pt", // Default language
  changeLanguage: (lang: string) => {
    i18n.language = lang;
  }
};

export default i18n;
