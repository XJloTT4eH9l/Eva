import { FC, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import emptyCart from '../../assets/img/cart-empty.svg';
import orderCompleted from '../../assets/img/order-completed.svg';
import OrderForm from '../../components/OrderForm/OrderForm';
import './OrderPage.scss';

const OrderPage:FC = () => {
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const orderDone = useAppSelector(state => state.cartItems.orderDone);
    const sum = cartItems.reduce((sum, item) => sum + item.price * item.quanity, 0);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(cartItems);
    }, [])
    return (
        <section className="order-page">
            <div className="container">
                {orderDone ? (
                    <div className='order-page__empty'>
                        <img className='order-page__empty-img' src={orderCompleted} alt='Кошик порожній' />
                        <h1 className='title order-page__title'>{t("order_page.order_complete")}</h1>
                        <p className='order-page__text'>{t("order_page.order_complete_descr")}</p>
                        <Link 
                            to='/'
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