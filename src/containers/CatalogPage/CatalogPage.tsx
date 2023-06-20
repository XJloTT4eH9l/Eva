import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/reduxHooks';

import Seo from '../../components/Seo/Seo';
import Categories from '../../components/Categories/Categories';
import './CatalogPage.scss';


const CatalogPage:FC = () => {
    const { t } = useTranslation();
    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Seo 
                title={currentLanguage.id === 1 ? 'Eva | Категорії' : 'Eva | Categories'}
                description={
                    currentLanguage.id === 1 
                        ? 'Купуйте в нашому магазині: зброжений сік, концентровані чаї, концетрований сік, фруктові сиропи, фруктові пюре, фруктово-ягідні соки' 
                        : 'Buy in our store: fermented juice, concentrated teas, concentrated juice, fruit syrups, fruit purees, fruit and berry juices'
                }
            />
            <section className="catalog-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/home'>{t("nav.main")}</Link>
                    <span className='bread-crumbs__item'>{t("nav.categories")}</span>
                </div>
            </div>
            <Categories />
        </section>
        </>
    )
}

export default CatalogPage