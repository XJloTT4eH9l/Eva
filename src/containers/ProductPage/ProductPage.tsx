import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { IProductDetail, ICategory } from '../../types/types';
import { addToCart, onClickPlus, onClickMinus } from '../../store/cartSlice';
import { addTorecentlyViewed } from '../../store/recentViewSlice';
import { API_PRODUCT, API_PRODUCTS, API_CATEGORIES } from '../../constants/api';
import { setCart } from '../../store/cartSlice';
import axios from 'axios';

import LinkBack from '../../components/LinkBack/LinkBack';
import SliderThumbs from '../../components/SliderThumbs/SliderThumbs';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';
import Spinner from '../../components/Spinner/Spinner';
import Notification from '../../components/Notification/Notification';
import mark from '../../assets/img/mark.svg';

import './ProductPage.scss';

interface ProductPageProps {
    setCartOpen: (open: boolean) => void;
}

const ProductPage:FC<ProductPageProps> = ({ setCartOpen }) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [productInfo, setProductInfo] = useState<IProductDetail>();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [categoryTitle, setCategoryTitle] = useState<string>();
    const [productId, setProductId] = useState<number>();
    const [productQuanuty, setProductQuanity] = useState<number>(0);
    const [textType, setTextType] = useState<string>('description');
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

            for(let i = 0; i < catRes.data.length; i++) {
                if(catRes.data[i].id === res.data.category_id) {
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
                minQuanityOrder: res.data.min_count_buy ,
                availability: res.data.available,
                description: res.data.description,
                characteristics: сharacteristicsParsed,
                promo: res.data.promo,
                barcode: res.data.barcode
            }
            setProductInfo(product);
            const itemQuanity = cartItemsSelector.find(item => item.id === Number(id));
            if(itemQuanity) {
                setProductQuanity(itemQuanity.quanity);
            }

            addToRecently(product);

            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    } 

    const onCart = () => {
        if(productInfo) {
            setProductAdded(true);
            dispatch(addToCart({ 
                id: productInfo.id,
                title: productInfo.title,
                images: productInfo.images,
                price: productInfo.price,
                quanity: productInfo.minQuanityOrder,
                minQuanityOrder: productInfo.minQuanityOrder,
                promo: productInfo.promo,
                barcode: productInfo.barcode
            }));
            window.setTimeout(() => setProductAdded(false), 2000);
        }
    }

    const onCartOpen = async () => {
        setCartOpen(true);
        try {
            const res = await axios.get<IProductDetail[]>(API_PRODUCTS + cartItemsIds.join(',') + `&lang_id=${currentLanguage.id}`);
            if(res.data.length > 0 && cartItemsSelector.length > 0) {
                const cartItemsNew = cartItemsSelector.map(item => {

                    for(let i = 0; i < res.data.length; i++) {
                        if(item.id === res.data[i].id) {
                            return (
                                {...item, title: res.data[i].title, promo: res.data[i].promo, price: res.data[i].price}
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

    const onPlus = (id: number) => {
        dispatch(onClickPlus(id))
    }

    const onMinus = (id: number) => {
        dispatch(onClickMinus(id))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductInfo(Number(id));
        setProductId(Number(id));
    }, [id, currentLanguage])

    useEffect(() => {
        const itemQuanity = cartItemsSelector.find(item => item.id === Number(id));
        if(itemQuanity) {
            setProductQuanity(itemQuanity.quanity)
        }
    }, [id, cartItemsSelector])

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
                    <>
                        <div className='product-page__inner'>
                            <div className="product-page__left">
                                {
                                    productInfo && (
                                        productInfo.images.length === 1 ? (
                                            <img className='product-page__img' src={productInfo.images[0]} alt={productInfo.title} />
                                        ) : (
                                            <SliderThumbs imgs={productInfo.images} />
                                        )
                                    )
                                }
                            </div>
                            <div className="product-page__right">
                                <h1 className='product-page__title'>{productInfo?.title}</h1>
                                <div className='product-page__cart'>
                                    <div className='product-page__price'>
                                        {productInfo?.promo ? (
                                            <p className='product-page__new-price'>
                                                {t("buy_info.price")} <strong>{productInfo?.promo.promo_price} {t("buy_info.uah")} </strong> 
                                                <span>{productInfo?.price} {t("buy_info.uah")}</span>
                                            </p> 
                                        ) : <span>{t("buy_info.price")} {productInfo?.price} {t("buy_info.uah")}</span> }
                                    </div>
                                    {
                                        productInfo?.availability === true 
                                            ?  <div className='product-page__availability product-page__availability--true'>{t("buy_info.in_stock")}</div>
                                            :  <div className='product-page__availability product-page__availability--false'>{t("buy_info.out_of_stock")}</div>
                                    }
                                    <p className='product-page__min-quanity'>{t("buy_info.min_count_buy")} {productInfo?.minQuanityOrder}</p>
                                    {productInfo?.availability &&
                                        cartItemsSelector.find(item => item.id === productInfo?.id)
                                            ? (
                                                <>
                                                    <div className='product-page__quanity'>
                                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                            <button className='product-page__btn-cart' onClick={() => onMinus(productInfo.id)}>-</button>
                                                                <span className='product-page__num'>{productQuanuty}</span>
                                                            <button className='product-page__btn-cart' onClick={() => onPlus(productInfo.id)}>+</button>
                                                        </div>
                                                        <p className='product-page__summary'>
                                                           {t("buy_info.sum") + ' '} 
                                                            {
                                                               productInfo.promo?.promo_price 
                                                                ? Math.round(productQuanuty * productInfo.promo.promo_price)
                                                                : Math.round(productQuanuty * productInfo.price)
                                                            } {t("buy_info.uah")}
                                                        </p>
                                                    </div>
                                                    <button onClick={onCartOpen} className='product-page__btn--cart--active'>
                                                        <img src={mark} alt='Додано в кошик' />
                                                        {t("buy_info.in_cart")}
                                                    </button>
                                                </>
                                            )
                                            : <button onClick={onCart} className='product-page__btn--cart'>{t("buy_info.add_to_cart")}</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='product-page__switch'>
                            <button 
                                className={textType === 'description' ? 'product-page__btn product-page__btn--active' : 'product-page__btn'}
                                onClick={() => setTextType('description')}
                            >
                                {t("product_page.description")}
                            </button>
                            <button 
                                className={textType === 'characteristics' ? 'product-page__btn product-page__btn--active' : 'product-page__btn'}
                                onClick={() => setTextType('characteristics')}
                            >
                               {t("product_page.characteristics")}
                            </button>
                        </div>
                    {
                        textType === 'description' 
                            ?   (<div className='product-page__text-container'>
                                    <p style={{ whiteSpace: "pre-wrap" }} className='product-page__text'>{productInfo?.description}</p>
                                </div>)
                            :  (
                                    <ul className='product-page__list'>
                                        {
                                            productInfo?.characteristics.map(char => (
                                                <li key={char.name} className='product-page__char'>
                                                    <div className='product-page__lable'>
                                                        <span>{char.name}</span>
                                                    </div>
                                                    <div className='product-page__value'>
                                                        <span>{char.text}</span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                            )
                    }
                    </>
                )}
                {recentlyViewed.length > 0 && <RecentlyViewed id={productId} type='product' />}
            </div>
        </section>
    )
}

export default ProductPage;