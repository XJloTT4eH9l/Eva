import { FC, useState, memo } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { NewPrice } from '../../types/types';
import { onClickMinus, onClickPlus, removeItem } from '../../store/cartSlice';
import './CartItem.scss';

interface CartItemProps {
    id: number;
    title: string;
    img: string[];
    price: number;
    quanity: number;
    minQuanityOrder: number;
    type?: string;
    promo?: NewPrice;
    barcode? : string;
}

const CartItem:FC<CartItemProps> = ({ id, title, img, price, quanity, minQuanityOrder, type, promo, barcode }) => {
    const dispatch = useAppDispatch();
    const [disable, setDisable] = useState<boolean>(false); 
    const { t } = useTranslation();

    const onMinus = (id: number, quanity: number) => {
        if(quanity !== minQuanityOrder) {
            dispatch(onClickMinus(id));
            setDisable(false);
        } else {
            setDisable(true);
        }
    }
    
    const onPlus = (id: number) => {
        dispatch(onClickPlus(id));
        setDisable(false);
    }

    const onRemove = (id: number) => {
        dispatch(removeItem(id))
    }

    return (
        <li className={`cart-item ${type === 'orderItem' && 'cart-item--order'}`}>
            <div className={type === 'orderItem' ? 'cart-item__inner cart-item__inner--order' : 'cart-item__inner'}>
                    {type === 'orderItem' ? (
                        <>
                            <div className='cart-item__left'>
                                <img className='cart-item__img cart-item__img--order' src={img[0]} alt={title} />
                                <h3 className='cart-item__title cart-item__title--order'>{title}</h3>
                            </div>
                            <div className='cart-item__right'>
                                <div className='cart-item__counter'>
                                    <button 
                                        className={disable ?  'cart-item__count-btn cart-item__count-btn--disable' : 'cart-item__count-btn'} 
                                        onClick={() => onMinus(id, quanity)}
                                    >
                                        -
                                    </button>
                                    <span className='cart-item__quanity'>{quanity}</span>
                                    <button className='cart-item__count-btn' onClick={() => onPlus(id)}>+</button>
                                </div>
                                <div className='cart-item__summ'>
                                    <span>{(price * quanity) % 1 !== 0 ? Math.round(price * quanity) : (price * quanity)} {t("buy_info.uah")}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <img className='cart-item__img' src={img[0]} alt={title} />
                            <div className='cart-item__content'>
                                <h3 className='cart-item__title'>{title}</h3>
                                <div className="cart-item__bottom">
                                    <div className='cart-item__counter'>
                                    <button 
                                        className={disable ?  'cart-item__count-btn cart-item__count-btn--disable' : 'cart-item__count-btn'} 
                                        onClick={() => onMinus(id, quanity)}
                                    >
                                        -
                                    </button>
                                        <span className='cart-item__quanity'>{quanity}</span>
                                        <button className='cart-item__count-btn' onClick={() => onPlus(id)}>+</button>
                                    </div>
                                    <div className='cart-item__summ'>
                                        <span>{(price * quanity) % 1 !== 0 ? Math.round(price * quanity) : (price * quanity)} {t("buy_info.uah")}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                <button className='cart-item__delete-btn' onClick={() => onRemove(id)}>
                    <svg className='cart-item__trash'><use href='#trash'></use></svg>
                </button>
            </div>
        </li>
    )
}

export default memo(CartItem);