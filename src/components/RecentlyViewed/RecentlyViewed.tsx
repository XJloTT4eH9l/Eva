import { FC, useEffect, useState } from 'react';
import Product from '../Product/Product';
import ProductSlider from '../ProductSlider/ProductSlider';
import { API_PRODUCTS } from '../../constants/api';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IProductDetail } from '../../types/types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './RecentlyViewed.scss';

interface RecentlyViewedProps {
    type: string;
    id?: number;
}

const RecentlyViewed:FC<RecentlyViewedProps> = ({ type, id }) => {
    const recents = useAppSelector(state => state.recentlyViewed.recentlyViewed);
    const [recentlyMain, setRecentlyMain] = useState<IProductDetail[]>(recents);
    const [recently, setRecently] = useState<IProductDetail[]>();
    const recentsIds = recents.map(item => item.id);
    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    const { t } = useTranslation();

    const getProductsById = async () => {
        try {
            const res = await axios.get<IProductDetail[]>(API_PRODUCTS + recentsIds.join(',') + `&lang_id=${currentLanguage.id}`);

            if(res.data.length > 0 && recents.length > 0) {
                const upadatedRecents = recentlyMain.map(item => {

                    for(let i = 0; i < res.data.length; i++) {
                        if(item.id === res.data[i].id) {
                           return { ...item, title: res.data[i].title, promo: res.data[i].promo, price: res.data[i].price }
                        }
                    }

                    return item
                });
                setRecentlyMain(upadatedRecents);
                setRecently(upadatedRecents.filter(item => item.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(recents.length > 0) {
            getProductsById();
        }
    }, [id])

    useEffect(() => {
        if(recents.length > 0) {
            getProductsById();
        }
    }, [currentLanguage])

    return (
        <section className={type === 'main' ? "recently-viewed recently-viewed--main" : "recently-viewed recently-viewed--product"}>
            {recents.length > 0 && (
                <div className="container container--recently-viewed">    
                { type === 'product' ? (
                    recently && recently.length >= 1  ? (
                        <>
                            <h2 className="title recents-product__title">{t("proposition.recently_viewed")}</h2>
                            <ProductSlider products={recently} />
                        </>
                    ) : (
                        <>
                            {recently && recently?.length >= 1 && <h2 className="title recents-product__title">{t("proposition.recently_viewed")}</h2>} 
                            <ul className='proposition__list'>
                            {
                                recently?.map((item) => { 
                                    return (
                                        <Product
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            img={item.images}
                                            price={item.price} 
                                            promo={item.promo}
                                        />
                                    )
                                })
                            }
                        </ul> 
                        </>
                    )
                    ) : (
                        <>
                            <h2 className="title proposition__title">{t("proposition.recently_viewed")}</h2>
                            {recents.length > 1 ? (
                                <ProductSlider products={recentlyMain} />
                            ) : (
                            <ul className='proposition__list'>
                                {
                                    recentlyMain.map((item) => {
                                        return (
                                            <Product
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                img={item.images}
                                                price={item.price}
                                                promo={item.promo} 
                                            />
                                        )
                                    })
                                }
                            </ul>
                        )}
                        </>
                    )
                }      
                </div>
            )}
        </section>
    )
}

export default RecentlyViewed;