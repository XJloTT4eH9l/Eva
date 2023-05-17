import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setLanguage, setAllLanguages } from '../../store/languageSlice';
import { useTranslation } from "react-i18next";
import { Lang } from '../../types/types';
import { API_LANGS, API_TRANSLATIONS } from '../../constants/api';
import axios from 'axios';
import './LanguageChange.scss';

interface LanguageChangeProps {
    type?: string;
    setMobileMenuOpen: (open: boolean) => void;
}

// type StaticTranslation = {
//     nav: Record<string, string>;
//     proposition: Record<string, string>;
//     contact_page: Record<string, string>;
//     search_page: Record<string, string>;
//     sorting: Record<string, string>;
//     buy_info: Record<string, string>;
//     product_page: Record<string, string>;
//     cart: Record<string, string>;
//     order_page: {
//     order: string;
//     order_complete: string;
//     order_complete_descr: string;
//     order_pick_up: string;
//     our_address: string;
//     our_address_short: string;
//     order_form: Record<string, string>;
//     };
//     about_page: Record<string, string>;
// }

// type Translation = {
//     lang_id: number;
//     data: StaticTranslation;
// };

const LanguageChange:FC<LanguageChangeProps> = ({ type, setMobileMenuOpen }) => {
    const langs = useAppSelector(state => state.languages.langs);
    const curentLang = useAppSelector(state => state.languages.curentLang);
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    const getLangs = async () => {
        try {
            const res = await axios.get(API_LANGS);
            if(res.status === 200) {
                dispatch(setAllLanguages(res.data));
            }
            
        } catch (error) {
           alert('Something went wrong, please reload the page');
        }
    }

    // const getTranslations = async () => {
    //     try {
    //         const res = await axios.get<Translation[]>(API_TRANSLATIONS + '*');
    //         console.log(res.data);

    //         const resourses: Record<string, { translation: StaticTranslation }> = {};

    //         res.data.forEach((item, i) => {
    //             if(item.lang_id === 1) {
    //                 resourses['UA'] = {translation: item.data}
    //             }
    //             if(item.lang_id === 2) {
    //                 resourses['EN'] = {translation: item.data}
    //             }
    //         })

    //         Object.keys(resourses).forEach((lang) => {
    //             i18next.addResourceBundle(lang, 'translation', resourses[lang]);
    //           });

    //         console.log(resourses);
    //     } catch (error) {
    //         alert('Error ocurred, try another time');
    //     }
    // }

    const onLanguage = (language: Lang) => {
        dispatch(setLanguage(language));
        i18n.changeLanguage(String(language.id));
    }
    
    useEffect(() => {
        getLangs();
        // getTranslations();
    }, [])

    return (
        <div className={type === 'mobileChange' ?  "language language--mobile" : 'language'}>
            {langs?.map(item => {
                const isActive = item.id === curentLang.id;

                return (
                    <p 
                        key={item.id} 
                        className={isActive ? "language__item language__item--active" : 'language__item' }
                        onClick={() => onLanguage(item)}
                    >
                        {item.code}
                    </p>
                )
            })}
        </div>
    )
}

export default LanguageChange;