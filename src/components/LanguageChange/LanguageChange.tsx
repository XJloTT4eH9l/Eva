import { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setLanguage } from '../../store/languageSlice';
import { useTranslation } from "react-i18next";
import './LanguageChange.scss';

interface LanguageChangeProps {
    type?: string;
    setMobileMenuOpen: (open: boolean) => void;
}

interface Lang {
    id: number;
    code: string;
    title: string;
}

const LanguageChange:FC<LanguageChangeProps> = ({ type, setMobileMenuOpen }) => {
    const langs = useAppSelector(state => state.languages.langs);
    const curentLang = useAppSelector(state => state.languages.curentLang);
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    const onLanguage = (language: Lang) => {
        dispatch(setLanguage(language));
        i18n.changeLanguage(language.code);
        setMobileMenuOpen(false);
    }
    
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