import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';

interface ProductProps {
    id: number;
    title: string;
    img: string;
    price: number;
}

const Product:FC<ProductProps> = ({ id, title, img, price }) => {
    return (
        <Link 
            key={id}
            className='product' 
            to={`/Eva/catalog/:${id}`}
        >
            <div className='product__top'>
                <img className='product__img' src={img} alt={title} />
                <h3 className='product__title'>{title}</h3>
            </div>
            <div className='product__bottom'>
                <p className='product__price'>{price} грн</p>
            </div>
        </Link>
    )
}

export default Product;