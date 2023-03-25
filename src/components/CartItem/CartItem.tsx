import { FC } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { onClickMinus, onClickPlus, removeItem } from '../../store/cartSlice';
import './CartItem.scss';

interface CartItemProps {
    id: number;
    title: string;
    img: string[];
    price: number;
    quanity: number;
    minQuanityOrder: number;
}

const CartItem:FC<CartItemProps> = ({ id, title, img, price, quanity, minQuanityOrder }) => {
    const dispatch = useAppDispatch();

    const onMinus = (id: number) => {
        dispatch(onClickMinus(id))
    }
    
    const onPlus = (id: number) => {
        dispatch(onClickPlus(id))
    }

    const onRemove = (id: number) => {
        dispatch(removeItem(id))
    }

    return (
        <li className="cart-item">
            <h3 className='cart-item__title'>{title}</h3>
            <div className="cart-item__inner">
                <div className='cart-item__middle'>
                    {img.map((item, i) => {
                        if(i < 1) {
                            return (
                                <img key={item} className='cart-item__img' src={item} alt={title} />
                            )
                        }
                    })}
                    <div>
                        <div className='cart-item__summ'>
                            Сумма: {price * quanity} грн
                        </div>
                        <div className='cart-item__counter'>
                            <button className='cart-item__count-btn' onClick={() => onMinus(id)}>-</button>
                            <span className='cart-item__quanity'>{quanity}</span>
                            <button className='cart-item__count-btn' onClick={() => onPlus(id)}>+</button>
                        </div>
                    </div>
                </div>
                <button className='cart-item__delete-btn' onClick={() => onRemove(id)}>x</button>
            </div>
        </li>
    )
}

export default CartItem