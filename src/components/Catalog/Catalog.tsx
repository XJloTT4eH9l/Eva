import { FC } from 'react';
import { IProduct } from '../../types/types';
import Product from '../Product/Product';
import './Catalog.scss';

interface CatalogProps {
    products?: IProduct[];
    // setProducts: (products: IProduct[]) => void;
}

const Catalog:FC<CatalogProps> = ({ products }) => {
   
    return (
        <div className='catalog'>
            <ul className="catalog__list">
                {
                    products?.map(product => (
                        <Product
                            key={product.id} 
                            id={product.id}
                            title={product.title}
                            img={product.images}
                            price={product.price}
                            type='catalog'
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Catalog;