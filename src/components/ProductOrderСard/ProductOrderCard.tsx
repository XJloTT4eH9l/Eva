import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IProductDetail, IProductSize } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { onClickPlus, onClickMinus, addToCart, onQuantityChange } from '../../store/cartSlice';
import mark from '../../assets/img/mark.svg';
import './ProductOrderCard.scss';

interface ProductOrderCardProps {
    info: IProductDetail;
    setProductAdded: (added: boolean) => void;
    onCartOpen: () => Promise<void>;
}

const ProductOrderCard:FC<ProductOrderCardProps> = ({ info, setProductAdded, onCartOpen }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [focus, setFocus] = useState<boolean>(false);
    // price will change to prices = [...]
    const { id, title, promo, price, minQuanityOrder, availability, images, barcode } = info;
    const cartItems = useAppSelector(state => state.cartItems.cartItems);

    //fake prices
    const productSizes = [
        {id: 1, package_id: 1, package_quantity: 13, price: 20, promo: {promo_price: null}},
        {id: 2, package_id: 2, package_quantity: 18, price: 30, promo: {promo_price: 18}},
        {id: 3, package_id: 3, package_quantity: 25, price: 40, promo: {promo_price: null}}
    ];
    const [currentSize, setCurrentSize] = useState<IProductSize>(productSizes[0])

    const onCart = () => {
        if (info) {
            setProductAdded(true);
            dispatch(addToCart({
                id: id,
                title: title,
                images: images,
                //change price
                price: currentSize.promo.promo_price ? currentSize.promo.promo_price : currentSize.price,
                quanity: minQuanityOrder,
                minQuanityOrder: minQuanityOrder,
                promo: currentSize.promo,
                barcode: barcode,
                size: currentSize.package_id
            }));
            window.setTimeout(() => setProductAdded(false), 2000);
        }
    }

    const quantityChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*$/;
        const value = e.target.value;

        if (regex.test(value)) {
            setProductQuantity(+value);
        }
    }

    const onPlus = (id: number) => {
        const size = currentSize.package_id;
        dispatch(onClickPlus({id, size}))
    }

    const onMinus = (id: number) => {
        const size = currentSize.package_id;
        dispatch(onClickMinus({id, size}));
    }

    const handleFocus = () => {
        setFocus(true);
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (info && minQuanityOrder && id) {
            const value = e.target.value.startsWith('0') ? e.target.value.slice(1) : e.target.value;
            if (productQuantity < minQuanityOrder) {
                const minQuantity = minQuanityOrder;
                dispatch(onQuantityChange({ id, value: minQuantity, size: currentSize.package_id }));
                setProductQuantity(minQuantity);
                setFocus(false);
            } else if (productQuantity > 9999) {
                const maxQuantity = 9999;
                dispatch(onQuantityChange({ id, value: maxQuantity, size: currentSize.package_id }));
                setProductQuantity(maxQuantity);
                setFocus(false);
            } else {
                dispatch(onQuantityChange({ id, value: +value, size: currentSize.package_id }));
                setProductQuantity(+value);
            }
        }
    }
    useEffect(() => {
        const itemQuanity = cartItems.find(item => item.id === id && item.size === currentSize.package_id);
        if (itemQuanity) {
            setProductQuantity(itemQuanity.quanity)
        }
    }, [id, cartItems, currentSize])
    return (
        <section className="product-order-card">
            <h1 className='product-order-card__title'>{title}</h1>
            <div className='product-order-card__cart'>
                <div className='product-order-card__price'>
                    {currentSize.promo.promo_price ? (
                        <p className='product-order-card__new-price'>
                            {t("buy_info.price")} <strong>{currentSize.promo.promo_price} {t("buy_info.uah")} </strong>
                            <span>{currentSize.price} {t("buy_info.uah")}</span>
                        </p>
                    ) : <span>{t("buy_info.price")} {currentSize.price} {t("buy_info.uah")}</span>}
                </div>
                {
                    availability === true
                        ? <div className='product-order-card__availability product-order-card__availability--true'>{t("buy_info.in_stock")}</div>
                        : <div className='product-order-card__availability product-order-card__availability--false'>{t("buy_info.out_of_stock")}</div>
                }
                <h2 className='product-order-card__subtitle'>Розміри:</h2>
                <ul className='product-order-card__sizes'>
                    {productSizes.map(size => (
                        <li 
                            key={size.id} 
                            className={size.package_id === currentSize.package_id ? 'product-order-card__size product-order-card__size--active' : 'product-order-card__size'} 
                            onClick={() => setCurrentSize(size)}
                        >
                            {size.package_quantity} л
                        </li>
                    ))}
                </ul>
                <p className='product-order-card__min-quanity'>{t("buy_info.min_count_buy")} {minQuanityOrder}</p>

                {/* <h2 className='product-order-card__subtitle'>Розміри:</h2> */}
                {/* <ul className='product-order-card__sizes'>
                    {productSizes.map(size => (
                        <li 
                            key={size.id} 
                            className={size.package_id === currentSize.package_id ? 'product-order-card__size product-order-card__size--active' : 'product-order-card__size'} 
                            onClick={() => setCurrentSize(size)}
                        >
                            {size.package_quantity} л
                        </li>
                    ))}
                </ul> */}

                {availability &&
                    cartItems.find(item => item.id === id && item.size === currentSize.package_id)
                    ? (
                        <>
                            <div className='product-order-card__quanity'>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='product-order-card__btn-cart' onClick={() => onMinus(id)}>-</button>
                                    {/* <span className='product-order-card__num'>{productQuanuty}</span> */}
                                    <input
                                        className='product-order-card__input'
                                        onChange={quantityChnage}
                                        value={productQuantity}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    <button className='product-order-card__btn-cart' onClick={() => onPlus(id)}>+</button>
                                </div>
                                <p className='product-order-card__summary'>
                                    {t("buy_info.sum") + ' '}
                                    {
                                        currentSize.promo?.promo_price
                                            ? Math.round(productQuantity * currentSize.promo.promo_price)
                                            : Math.round(productQuantity * currentSize.price)
                                    } {t("buy_info.uah")}
                                </p>
                            </div>
                            <button onClick={onCartOpen} className='product-order-card__btn--cart--active'>
                                <img src={mark} alt='Додано в кошик' />
                                {t("buy_info.in_cart")}
                            </button>
                        </>
                    )
                    : <button onClick={onCart} className='product-order-card__btn--cart'>{t("buy_info.add_to_cart")}</button>
                }
            </div>
        </section>
    )
}

export default ProductOrderCard;