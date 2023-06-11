import { FC, useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { NewPrice } from '../../types/types';
import { onClickMinus, onClickPlus, removeItem, onQuantityChange } from '../../store/cartSlice';
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
    setCartOpen?: (item: boolean) => void;
}

const CartItem:FC<CartItemProps> = ({ id, title, img, price, quanity, minQuanityOrder, type, promo, barcode, setCartOpen }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const [disable, setDisable] = useState<boolean>(false); 
    const [inputQuantity, setInputQuantity] = useState<number>(quanity);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
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

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputQuantity < minQuanityOrder) {
            dispatch(onQuantityChange({id: String(id), value: minQuanityOrder}))
            setInputQuantity(minQuanityOrder)
        } else if (inputQuantity > 9999) {
            dispatch(onQuantityChange({id: String(id), value: 9999}))
            setInputQuantity(9999)
        } else {
            dispatch(onQuantityChange({id: String(id), value: +e.target.value}));
            setInputQuantity(+e.target.value);
        }
    }

    const handleFocus = () => {
        setInputFocus(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*$/;
        const value =  e.target.value;

        if(regex.test(value)) {
            setInputQuantity(+value);
        }
    }

    useEffect(() => {
        const currentItem = cartItems.find(item => item.id === id);
        if(currentItem) {
            setInputQuantity(currentItem.quanity);
        }
    }, [cartItems])

    return (
        <li className={`cart-item ${type === 'orderItem' && 'cart-item--order'}`}>
            <div className={type === 'orderItem' ? 'cart-item__inner cart-item__inner--order' : 'cart-item__inner'}>
                    {type === 'orderItem' ? (
                        <>
                            <Link to={`/product/${id}`} target='_blank' className='cart-item__left'>
                                <img className='cart-item__img cart-item__img--order' src={img[0]} alt={title} />
                                <h3 className='cart-item__title cart-item__title--order'>{title}</h3>
                            </Link>
                            <div className='cart-item__right'>
                                <div className='cart-item__counter'>
                                    <button 
                                        className={disable ?  'cart-item__count-btn cart-item__count-btn--disable' : 'cart-item__count-btn'} 
                                        onClick={() => onMinus(id, quanity)}
                                    >
                                        -
                                    </button>
                                    <input 
                                        className='cart-item__quanity' 
                                        onChange={handleChange} 
                                        value={inputQuantity}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    <button className='cart-item__count-btn' onClick={() => onPlus(id)}>+</button>
                                </div>
                                <div className='cart-item__summ'>
                                    <span>
                                        {promo 
                                            ? (promo.promo_price * quanity) % 1 !== 0 ? Math.round(promo.promo_price * quanity) : (promo.promo_price * quanity)
                                            : (price * quanity) % 1 !== 0 ? Math.round(price * quanity) : (price * quanity)
                                        } 
                                        {t("buy_info.uah")}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to={`/product/${id}`} onClick={() => setCartOpen && setCartOpen(false)}>
                                <img className='cart-item__img' src={img[0]} alt={title} />
                            </Link>
                            <div className='cart-item__content'>
                                <Link to={`/product/${id}`} onClick={() => setCartOpen && setCartOpen(false)}>
                                    <h3 className='cart-item__title'>{title}</h3>
                                </Link>
                                <div className="cart-item__bottom">
                                    <div className='cart-item__counter'>
                                    <button 
                                        className={disable ?  'cart-item__count-btn cart-item__count-btn--disable' : 'cart-item__count-btn'} 
                                        onClick={() => onMinus(id, quanity)}
                                    >
                                        -
                                    </button>
                                        {/* <span className='cart-item__quanity'>{quanity}</span> */}
                                        <input 
                                            className='cart-item__quanity' 
                                            onChange={handleChange} 
                                            value={inputQuantity}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                        <button className='cart-item__count-btn' onClick={() => onPlus(id)}>+</button>
                                    </div>
                                    <div className='cart-item__summ'>
                                        <span>
                                        {promo 
                                            ? (promo.promo_price * quanity) % 1 !== 0 ? Math.round(promo.promo_price * quanity) : (promo.promo_price * quanity)
                                            : (price * quanity) % 1 !== 0 ? Math.round(price * quanity) : (price * quanity)
                                        } 
                                        {t("buy_info.uah")}
                                        </span>
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