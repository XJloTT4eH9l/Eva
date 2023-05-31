import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { API_TRANSLATIONS } from './constants/api';
import { ITranslation, StaticTranslation } from './types/types';
import axios from 'axios';
import translationUa from './locales/UA/translation.json';

const resources = {
  '1': {
    translation: translationUa
  }
}
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "1",
    lng: "1",
    interpolation: {
      escapeValue: false
    }
  })


const getTranslations = async () => {
  try {
    const res = await axios.get<ITranslation[]>(API_TRANSLATIONS + '*');

    const resources: Record<string, { translation: StaticTranslation }> = {};

    res.data.forEach((item) => {
      resources[String(item.lang_id)] = { translation: item.data }
    })

    i18n.init({
      resources,
      fallbackLng: '1',
      lng: '1',
      interpolation: {
        escapeValue: false,
      },
    });

  } catch (error) {
    alert('Error ocurred, try another time');
  }
}
getTranslations();

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "1",
    lng: "1",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n;