import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';

import CartItem from '../CartItem/CartItem';
import close from '../../assets/img/close.png';
import cartEmpty from '../../assets/img/cart-empty.svg';

import './SideCart.scss';

interface SideCartProps {
    cartOpen: boolean;
    setCartOpen: (item: boolean) => void;
}

const SideCart:FC<SideCartProps> = ({ cartOpen, setCartOpen }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const sum = cartItems.reduce((sum, item) => item.promo?.promo_price ? sum + item.promo.promo_price * item.quanity : sum + item.price * item.quanity, 0);
    const { t } = useTranslation();

    const onClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div className={cartOpen ? "side-cart side-cart--active" : 'side-cart'}>
            <div className='side-cart__header'>
                <div className='side-cart__top'>
                    <h2 className='side-cart__title'>{t("cart.cart")}</h2>
                    <button className='side-cart__close-btn' onClick={() => setCartOpen(false)}>
                        <img src={close} alt={t("cart.close_cart") || 'close'}/>
                    </button>
                </div>
            </div>
            {cartItems && (
                    cartItems.length > 0
                        ? (
                            <div>
                                <ul className='side-cart__list'>
                                {
                                    cartItems.map(item => (
                                        <CartItem
                                            key={item.id + ' ' + item.size}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            img={item.images} 
                                            quanity={item.quanity}
                                            minQuanityOrder={item.minQuanityOrder}
                                            barcode={item.barcode}
                                            promo={item.promo}
                                            setCartOpen={setCartOpen}
                                            size={item.size}
                                        />
                                    ))
                                }
                            </ul>
                            <div className='side-cart__btn-container'>
                                <button className='side-cart__btn-clean' onClick={onClearCart}>{t("cart.clear_cart")}</button>
                            </div>
                            </div>
                        )
                        : (
                            <div className='side-cart__empty'>
                                <img className='side-cart__empty-img' src={cartEmpty} alt={t("cart.empty_cart") || 'empty'} />
                                <h3 className='side-cart__heading'>{t("cart.empty_cart")}</h3>
                            </div>
                        )
            )
            }
            <div className='side-cart__bottom'>
                <div className='side-cart__bottom--inner'>
                    <h4 className='side-cart__subtitle'>{t("buy_info.sum")}</h4>
                    <span>{sum % 1 !== 0 ? sum.toFixed(2) : sum} {t("buy_info.uah")}</span>
                </div>
                {cartItems.length > 0 && (
                    <div className='side-cart__btn-container'>
                        <Link 
                            to={'/order'} 
                            className='side-cart__confirm'
                            onClick={() => setCartOpen(false)}
                        >
                            {t("cart.order")}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideCart;