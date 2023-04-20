import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationUa from './locales/ua/translation.json';
import translationEn from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEn
  },
  ua: {
    translation: translationUa
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use (initReactI18next)
  .init({
    resources,
    fallbackLng: "ua",
    debug: true,
    lng: "ua",
    interpolation: {
      escapeValue: false
    }
    // fallbackLng: 'ua',
    // debug: true,
    // detection: {
    //   order: ['queryString', 'cookie'],
    //   cache: ['cookie']
    // },
    // interpolation: {
    //   escapeValue: false
    // }
  })

export default i18n;