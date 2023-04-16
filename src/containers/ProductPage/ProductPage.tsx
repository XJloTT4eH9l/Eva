import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';

import { Link } from 'react-router-dom';
import { IProductDetail } from '../../types/types';
import { addToCart, onClickPlus, onClickMinus } from '../../store/cartSlice';
import { addTorecentlyViewed } from '../../store/recentViewSlice';
import { API_PRODUCT } from '../../constants/api';
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
    const dispatch = useAppDispatch();

    const [productInfo, setProductInfo] = useState<IProductDetail>();
    const [productId, setProductId] = useState<number>();
    const [productQuanuty, setProductQuanity] = useState<number>(0);
    const [textType, setTextType] = useState<string>('description');
    const [productAdded, setProductAdded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const cartItemsSelector = useAppSelector(state => state.cartItems.cartItems);
    const recentlyViewed = useAppSelector(state => state.recentlyViewed.recentlyViewed);

    const addToRecently = (recent: IProductDetail) => {
        dispatch(addTorecentlyViewed(recent))
    }

    const getProductInfo = async (id: number) => {
        try {
            setLoading(true);

            const res = await axios.get(API_PRODUCT + id + '?lang_id=1');
            console.log(res);
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
            console.log(product);
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
                promo: productInfo.promo
            }));
            window.setTimeout(() => setProductAdded(false), 2000);
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
    }, [id])

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
                    <Link className='bread-crumbs__item' to='/'>Головна</Link>
                    <Link className='bread-crumbs__item' to='/categories'>Категорії</Link>
                    <span className='bread-crumbs__item'>{productInfo?.title}</span>
                </div>
                
                <Notification text={`"${productInfo?.title}" - додано до кошика`} productAdded={productAdded} />
                <div className='product-page__d-flex'>
                    <LinkBack />
                    <p>Артикль: {productInfo?.barcode}</p>
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
                                                Ціна: <strong>{productInfo?.promo.promo_price} грн </strong> 
                                                <span>{productInfo?.price} грн</span>
                                            </p> 
                                        ) : <span>Ціна: {productInfo?.price} грн</span> }
                                    </div>
                                    {
                                        productInfo?.availability === true 
                                            ?  <div className='product-page__availability product-page__availability--true'>Є в наявності</div>
                                            :  <div className='product-page__availability product-page__availability--false'>Немає в наявності</div>
                                    }
                                    <p className='product-page__min-quanity'>* мінімальна кількість замовлення - {productInfo?.minQuanityOrder}</p>
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
                                                            Разом: 
                                                            {
                                                               productInfo.promo?.promo_price 
                                                                ? Math.round(productQuanuty * productInfo.promo.promo_price)
                                                                : Math.round(productQuanuty * productInfo.price)
                                                            } грн
                                                        </p>
                                                    </div>
                                                    <button onClick={() => (setCartOpen(true))} className='product-page__btn--cart--active'>
                                                        <img src={mark} alt='Додано в кошик' />
                                                        Товар в кошику
                                                    </button>
                                                </>
                                            )
                                            : <button onClick={onCart} className='product-page__btn--cart'>Додати в корзину</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='product-page__switch'>
                            <button 
                                className={textType === 'description' ? 'product-page__btn product-page__btn--active' : 'product-page__btn'}
                                onClick={() => setTextType('description')}
                            >
                                Опис
                            </button>
                            <button 
                                className={textType === 'characteristics' ? 'product-page__btn product-page__btn--active' : 'product-page__btn'}
                                onClick={() => setTextType('characteristics')}
                            >
                                Характеристики
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