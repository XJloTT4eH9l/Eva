import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { API_TRANSLATIONS } from './constants/api';
import axios from 'axios';

type StaticTranslation = {
  nav: Record<string, string>;
  proposition: Record<string, string>;
  contact_page: Record<string, string>;
  search_page: Record<string, string>;
  sorting: Record<string, string>;
  buy_info: Record<string, string>;
  product_page: Record<string, string>;
  cart: Record<string, string>;
  order_page: {
  order: string;
  order_complete: string;
  order_complete_descr: string;
  order_pick_up: string;
  our_address: string;
  our_address_short: string;
  order_form: Record<string, string>;
  };
  about_page: Record<string, string>;
}
type Translation = {
  lang_id: number;
  data: StaticTranslation;
};


const getTranslations = async () => {
  try {
    const res = await axios.get<Translation[]>(API_TRANSLATIONS + '*');

    const resources: Record<string, { translation: StaticTranslation }> = {};

    res.data.forEach((item) => {
      resources[String(item.lang_id)] = { translation: item.data }
    })
    console.log(resources);

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

// import translationUa from './locales/UA/translation.json';
// import translationEn from './locales/EN/translation.json';

 // EN: {
  //   translation: translationEn
  // },
  // UA: {
  //   translation: translationUa
  // }