import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setLanguage, setAllLanguages } from '../../store/languageSlice';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Lang } from '../../types/types';
import { API_LANGS } from '../../constants/api';
import axios from 'axios';
import './LanguageChange.scss';

interface LanguageChangeProps {
    type?: string;
    setMobileMenuOpen: (open: boolean) => void;
}

const LanguageChange:FC<LanguageChangeProps> = ({ type, setMobileMenuOpen }) => {
    const langs = useAppSelector(state => state.languages.langs);
    const curentLang = useAppSelector(state => state.languages.curentLang);
    const location = useLocation();
    const currentPath = location.pathname;
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

    const onLanguage = (language: Lang) => {
        dispatch(setLanguage(language));
        i18n.changeLanguage(String(language.id));
    }
    
    useEffect(() => {
        console.log(currentPath);
        getLangs();
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