import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Categories from '../../components/Categories/Categories';
import './CatalogPage.scss';


const CatalogPage:FC = () => {
    const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <section className="catalog-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/home'>{t("nav.main")}</Link>
                    <span className='bread-crumbs__item'>{t("nav.categories")}</span>
                </div>
            </div>
            <Categories />
        </section>
    )
}

export default CatalogPage