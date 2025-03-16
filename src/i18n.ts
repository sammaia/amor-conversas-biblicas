
// This is a simple placeholder for the i18n library.
// We're not actually using react-i18next but keeping our own translations system
const i18n = {
  language: "pt", // Default language is Portuguese
  changeLanguage: (lang: string) => {
    // Only accept pt or en
    if (lang === "pt" || lang === "en") {
      i18n.language = lang;
      // Save language preference in localStorage
      localStorage.setItem("preferred-language", lang);
    }
  },
  // Initialize language from localStorage if available
  init: () => {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage === "pt" || savedLanguage === "en") {
      i18n.language = savedLanguage;
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.substring(0, 2);
      i18n.language = browserLang === "pt" ? "pt" : "en";
    }
    return i18n.language;
  }
};

export default i18n;
