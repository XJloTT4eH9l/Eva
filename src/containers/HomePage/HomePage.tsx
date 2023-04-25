import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { API_NEW_PRODUCTS, API_PROMOTIONS } from '../../constants/api';
import { IProductDetail } from '../../types/types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Proposition from '../../components/Proposition/Proposition';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';

import './HomePage.scss';

const HomePage = () => {
    const [newProducts, setNewProducts] = useState<IProductDetail[]>();
    const [promotions, setPromotions] = useState<IProductDetail[]>();
    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    const { t } = useTranslation();

    const getProducts = async (link: string, type: string) => {
        try {
            const res = await axios.get(link + `?lang_id=${currentLanguage.id}&page_size=8`);
            if(res.status === 200) {
                switch(type) {
                    case 'newProducts': setNewProducts(res.data.products); break
                    case 'promotions': setPromotions(res.data.products); break
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts(API_NEW_PRODUCTS, 'newProducts');
        getProducts(API_PROMOTIONS, 'promotions');
    }, [])

    useEffect(() => {
        getProducts(API_NEW_PRODUCTS, 'newProducts');
        getProducts(API_PROMOTIONS, 'promotions');
    }, [currentLanguage])
    return (
        <>
            <Hero /> 
            <Categories />
            {promotions && (
               <Proposition 
                    title={t("proposition.promo")}
                    products={promotions}
                /> 
            )}

            {newProducts && (
                <Proposition 
                title={t("proposition.new_products")}
                    products={newProducts}
                />
            )}

            <RecentlyViewed type='main' />
        </>
    )
}

export default HomePage;