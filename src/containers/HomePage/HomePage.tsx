import { useState, useEffect } from 'react';
import { API_NEW_PRODUCTS, API_PROMOTIONS } from '../../constants/api';
import { IProductDetail } from '../../types/types';
import axios from 'axios';

import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Proposition from '../../components/Proposition/Proposition';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';

import './HomePage.scss';

const HomePage = () => {
    const [newProducts, setNewProducts] = useState<IProductDetail[]>();
    const [promotions, setPromotions] = useState<IProductDetail[]>();

    const getProducts = async (link: string, type: string) => {
        try {
            const res = await axios.get(link + '?lang_id=1&page_size=8');
            console.log(res.data.products);
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
        getProducts(API_NEW_PRODUCTS, 'newProducts');
        getProducts(API_PROMOTIONS, 'promotions');
    }, [])
    return (
        <>
            <Hero /> 
            <Categories />
            {promotions && (
               <Proposition 
                    title='Акції'
                    products={promotions}
                /> 
            )}

            {newProducts && (
                <Proposition 
                    title='Нові товари'
                    products={newProducts}
                />
            )}
            
            <RecentlyViewed type='main' />
        </>
    )
}

export default HomePage;