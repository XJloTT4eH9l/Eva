import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { Link } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';

import CartItem from '../CartItem/CartItem';
import close from '../../assets/img/close.png';

import './SideCart.scss';

interface SideCartProps {
    cartOpen: boolean;
    setCartOpen: (item: boolean) => void;
}

const SideCart:FC<SideCartProps> = ({ cartOpen, setCartOpen }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const sum = cartItems.reduce((sum, item) => sum + item.price * item.quanity, 0);

    const onClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div className={cartOpen ? "side-cart side-cart--active" : 'side-cart'}>
            <div className='side-cart__header'>
                <div className='side-cart__top'>
                    <h2 className='side-cart__title'>Корзина</h2>
                    <button className='side-cart__close-btn' onClick={() => setCartOpen(false)}>
                        <img src={close} alt='Закрити корзину'/>
                    </button>
                </div>
            </div>
            {
                cartItems.length > 0
                    ? (
                        <div>
                            <ul className='side-cart__list'>
                            {
                                 cartItems.map(item => (
                                    <CartItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        img={item.img[0]} 
                                        quanity={item.quanity}
                                        minQuanityOrder={item.minQuanityOrder}
                                    />
                                ))
                            }
                        </ul>
                        <div className='side-cart__btn-container'>
                            <button className='side-cart__btn-clean' onClick={onClearCart}>Очистити корзину</button>
                        </div>
                        </div>
                    )
                    : (
                        <div>
                            <h3>Корзина пуста</h3>
                        </div>
                    )
            }
            <div className='side-cart__bottom'>
                <div className='side-cart__bottom--inner'>
                    <h4 className='side-cart__subtitle'>Разом</h4>
                    <span>{sum} грн</span>
                </div>
                <div className='side-cart__btn-container'>
                    <Link to={'/order-page'} className='side-cart__confirm'>Оформити замовлення</Link>
                </div>
            </div>
        </div>
    )
}

export default SideCart;