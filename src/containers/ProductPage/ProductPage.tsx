import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { IProductDetail, ICategory } from '../../types/types';
import { addTorecentlyViewed } from '../../store/recentViewSlice';
import { API_PRODUCT, API_PRODUCTS, API_CATEGORIES } from '../../constants/api';
import { setCart } from '../../store/cartSlice';
import axios from 'axios';

import LinkBack from '../../components/LinkBack/LinkBack';
import SliderThumbs from '../../components/SliderThumbs/SliderThumbs';
import ProductOrderCard from '../../components/ProductOrderСard/ProductOrderCard';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';
import Spinner from '../../components/Spinner/Spinner';
import Notification from '../../components/Notification/Notification';

import './ProductPage.scss';

interface ProductPageProps {
    setCartOpen: (open: boolean) => void;
}

const ProductPage: FC<ProductPageProps> = ({ setCartOpen }) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [productInfo, setProductInfo] = useState<IProductDetail>();
    const [categoryId, setCategoryId] = useState<number>(0);
    const [categoryTitle, setCategoryTitle] = useState<string>();
    const [productId, setProductId] = useState<number>();
    const [productAdded, setProductAdded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const cartItemsSelector = useAppSelector(state => state.cartItems.cartItems);
    const cartItemsIds = cartItemsSelector.map(item => item.id);
    const recentlyViewed = useAppSelector(state => state.recentlyViewed.recentlyViewed);
    const currentLanguage = useAppSelector(state => state.languages.curentLang);

    const addToRecently = (recent: IProductDetail) => {
        dispatch(addTorecentlyViewed(recent))
    }

    const getProductInfo = async (id: number) => {
        try {
            setLoading(true);
            const catRes = await axios.get<ICategory[]>(API_CATEGORIES + `?lang_id=${currentLanguage.id}`);
            const res = await axios.get(API_PRODUCT + id + `&lang_id=${currentLanguage.id}`);
            setCategoryId(res.data.category_id);

            for (let i = 0; i < catRes.data.length; i++) {
                if (catRes.data[i].id === res.data.category_id) {
                    setCategoryTitle(catRes.data[i].title);
                }
            }

            const сharacteristicsParsed = Object.entries(res.data.characteristic)
                .map(item => [String(item[0]), String(item[1])])
                .map(([name, text]) => ({ name, text }));
            const product: IProductDetail = {
                id: res.data.id,
                title: res.data.title,
                images: res.data.images,
                price: res.data.price,
                minQuanityOrder: res.data.min_count_buy,
                availability: res.data.available,
                description: res.data.description,
                characteristics: сharacteristicsParsed,
                promo: res.data.promo,
                barcode: res.data.barcode
            }
            setProductInfo(product);
            addToRecently(product);

            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    const onCartOpen = async () => {
        setCartOpen(true);
        try {
            const res = await axios.get<IProductDetail[]>(API_PRODUCTS + cartItemsIds.join(',') + `&lang_id=${currentLanguage.id}`);
            if (res.data.length > 0 && cartItemsSelector.length > 0) {
                const cartItemsNew = cartItemsSelector.map(item => {

                    for (let i = 0; i < res.data.length; i++) {
                        if (item.id === res.data[i].id) {
                            return (
                                { ...item, title: res.data[i].title, promo: res.data[i].promo, price: res.data[i].price }
                            )
                        }
                    }
                    return item
                });
                dispatch(setCart(cartItemsNew));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductInfo(Number(id));
        setProductId(Number(id));
    }, [id, currentLanguage])

    return (
        <section className="product-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/home'>{t("nav.main")}</Link>
                    <Link className='bread-crumbs__item' to='/categories'>{t("nav.categories")}</Link>
                    <Link className='bread-crumbs__item' to={`/categories/${categoryId}`}>{categoryTitle}</Link>
                    <span className='bread-crumbs__item'>{productInfo?.title}</span>
                </div>

                <Notification text={`"${productInfo?.title}" - ${t("buy_info.added_to_cart")}`} productAdded={productAdded} />
                <div className='product-page__d-flex'>
                    <LinkBack />
                    <p>{t("buy_info.barcode")} {productInfo?.barcode}</p>
                </div>
                {loading ? <Spinner /> : (
                    productInfo && (
                        <>
                            <div className='product-page__inner'>
                                <div className="product-page__left">
                                    {
                                        productInfo.images.length === 1 ? (
                                            <img className='product-page__img' src={productInfo.images[0]} alt={productInfo.title} />
                                        ) : (
                                            <SliderThumbs imgs={productInfo.images} />
                                        )
                                    }
                                </div>
                                <div className="product-page__right">
                                    <ProductOrderCard 
                                        info={productInfo}
                                        setProductAdded={setProductAdded}
                                        onCartOpen={onCartOpen}
                                    />
                                </div>
                            </div>
                            <ProductInfo
                                description={productInfo.description}
                                characteristics={productInfo.characteristics}
                            />
                        </>
                    )
                )}
                {recentlyViewed.length > 0 && <RecentlyViewed id={productId} type='product' />}
            </div>
        </section>
    )
}

export default ProductPage;