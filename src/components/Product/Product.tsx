import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';

interface ProductProps {
    id: number;
    title: string;
    img: string[];
    price: number;
    type?: string;
}

const Product:FC<ProductProps> = ({ id, title, img, price, type }) => {
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
                <p className={`product__price product__price--${type && type}`}>{price} грн</p>
            </div>
        </Link>
    )
}

export default Product;