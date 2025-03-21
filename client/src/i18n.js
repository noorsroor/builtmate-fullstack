import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import store from './redux/store';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLanguage, // Set initial language from localStorage
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Listen to language changes from Redux and update i18n language
store.subscribe(() => {
  const currentLang = store.getState().language.language;
  if (i18n.language !== currentLang) {
    i18n.changeLanguage(currentLang); // Change language dynamically
  }
});

export default i18n;
