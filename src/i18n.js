import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationUa from './locales/UA/translation.json';
import translationEn from './locales/EN/translation.json';

const resources = {
  EN: {
    translation: translationEn
  },
  UA: {
    translation: translationUa
  }
}


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "UA",
    debug: true,
    lng: "UA",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n;