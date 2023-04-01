import { FC } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { onClickMinus, onClickPlus, removeItem } from '../../store/cartSlice';
import trash from  '../../assets/img/trash.svg';
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
            <div className="cart-item__inner">
                    <img className='cart-item__img' src={img[0]} alt={title} />
                    <div className='cart-item__content'>
                        <h3 className='cart-item__title'>{title}</h3>
                        <div className="cart-item__bottom">
                            <div className='cart-item__counter'>
                                <button className='cart-item__count-btn' onClick={() => onMinus(id)}>-</button>
                                <span className='cart-item__quanity'>{quanity}</span>
                                <button className='cart-item__count-btn' onClick={() => onPlus(id)}>+</button>
                            </div>
                            <div className='cart-item__summ'>{price * quanity} грн</div>
                        </div>
                    </div>
                <button className='cart-item__delete-btn' onClick={() => onRemove(id)}>
                    <svg className='cart-item__trash'><use href='#trash'></use></svg>
                    </button>
            </div>
        </li>
    )
}

export default CartItem