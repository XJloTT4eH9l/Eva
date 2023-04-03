import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import emptyCart from '../../assets/img/cart-empty.svg';
import './OrderPage.scss';

const OrderPage:FC = () => {
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const sum = cartItems.reduce((sum, item) => sum + item.price * item.quanity, 0);

    return (
        <section className="order-page">
            <div className="container">
                {cartItems.length > 0 ? (
                    <>
                        <h1 className="title">Ваше замовлення</h1>
                        <div className="order-page__inner">
                            <ul className='order-page__list'>
                                {
                                    cartItems.map(item => (
                                        <CartItem 
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            img={item.img} 
                                            quanity={item.quanity}
                                            minQuanityOrder={item.minQuanityOrder}
                                            type='orderItem'
                                        />
                                    ))
                                }
                            </ul>
                            <p className='order-page__summ'>Разом: {sum} грн</p>
                        </div>
                    </>
                ) : (
                    <div className='order-page__empty'>
                        <img className='order-page__empty-img' src={emptyCart} alt='Кошик порожній' />
                        <h1 className='title'>Кошик порожній</h1>
                        <p className='order-page__text'>На даний момент кошик пустий. Щоб зробити замовлення перейдіть до каталогу товарів та додайте щось в кошик</p>
                        <Link 
                            to='/categories'
                            className='order-page__categories-link'
                        >
                            До каталогу
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

export default OrderPage;