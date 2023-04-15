import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NewPrice } from '../../types/types';
import './Product.scss';

interface ProductProps {
    id: number;
    title: string;
    img: string[];
    price: number;
    type?: string;
    promo? : NewPrice;
}

const Product:FC<ProductProps> = ({ id, title, img, price, type, promo }) => {
    return (
        <Link 
            key={id}
            className={`product product--${type && type}`}
            to={`/product/${id}`}
        >
            <div className='product__top'>
                <img className={`product__img product__img--${type && type}`} src={img && img[0]} alt={title} />
                <h3 className='product__title'>{title}</h3>
            </div>
            <div className='product__bottom'>
                {promo?.promo_price ? (
                    <div>
                        <p className='product__old-price'>{price} грн</p>
                        <p className='product__new-price'>{promo.promo_price} грн</p>
                    </div>
                ) : (<p className={`product__price product__price--${type && type}`}>{price} грн</p>)}
            </div>
        </Link>
    )
}

export default Product;