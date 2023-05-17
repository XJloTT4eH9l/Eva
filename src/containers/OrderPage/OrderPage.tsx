import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { setCart } from '../../store/cartSlice';
import { API_PRODUCTS } from '../../constants/api';
import { IProductDetail } from '../../types/types';
import axios from 'axios';
import CartItem from '../../components/CartItem/CartItem';
import emptyCart from '../../assets/img/cart-empty.svg';
import orderCompleted from '../../assets/img/order-completed.svg';
import OrderForm from '../../components/OrderForm/OrderForm';
import './OrderPage.scss';

const OrderPage:FC = () => {
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const orderDone = useAppSelector(state => state.cartItems.orderDone);
    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    const sum = cartItems.reduce((sum, item) => item.promo?.promo_price ? sum + item.promo.promo_price * item.quanity : sum + item.price * item.quanity, 0);
    const cartItemsIds = cartItems.map(item => item.id);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const translateCartItems = async () => {
        try {
            const res = await axios.get<IProductDetail[]>(API_PRODUCTS + cartItemsIds.join(',') + `&lang_id=${currentLanguage.id}`);
            if(res.data.length > 0 && cartItems.length > 0) {
                const cartItemsNew = cartItems.map(item => {
    
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        translateCartItems();
    }, [currentLanguage])
    return (
        <section className="order-page">
            <div className="container">
                {orderDone ? (
                    <div className='order-page__empty'>
                        <img className='order-page__empty-img' src={orderCompleted} alt='Кошик порожній' />
                        <h1 className='title order-page__title'>{t("order_page.order_complete")}</h1>
                        <p className='order-page__text'>{t("order_page.order_complete_descr")}</p>
                        <Link 
                            to='/home'
                            className='order-page__categories-link'
                        >
                            {t("nav.to_main")}
                        </Link>
                    </div>
                ) : (
                   cartItems.length > 0 ? (
                    <>
                        <h1 className="title">{t("order_page.order")}</h1>
                        <div className="order-page__inner">
                            <ul className='order-page__list'>
                                {
                                    cartItems.map(item => (
                                        <CartItem 
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            promo={item.promo}
                                            img={item.images} 
                                            quanity={item.quanity}
                                            minQuanityOrder={item.minQuanityOrder}
                                            type='orderItem'
                                        />
                                    ))
                                }
                            </ul>
                            <p className='order-page__summ'>{t("buy_info.sum")} {sum.toFixed(2)} {t("buy_info.uah")}</p>
                            <OrderForm />
                        </div>
                    </>
                ) : (
                    <div className='order-page__empty'>
                        <img className='order-page__empty-img' src={emptyCart} alt={t("cart.empty_cart") || 'empty'} />
                        <h1 className='title order-page__title'>{t("cart.empty_cart")}</h1>
                        <p className='order-page__text'>{t("cart.empty_cart_descr")}</p>
                        <Link 
                            to='/categories'
                            className='order-page__categories-link'
                        >
                           {t("nav.to_catalog")}
                        </Link>
                    </div>
                )
                )}
            </div>
        </section>
    )
}

export default OrderPage;