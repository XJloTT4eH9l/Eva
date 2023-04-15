import { FC } from 'react';
import Product from '../Product/Product';
import ProductSlider from '../ProductSlider/ProductSlider';
import { IProductDetail } from '../../types/types';
import './Proposition.scss';

interface PropositionProps {
    title: string;
    products: IProductDetail[];
}

const Proposition:FC<PropositionProps> = ({ title, products }) => {
   console.log(products);
    return (
        <section className="proposition">
            {products.length > 0 && (
                <div className="container container--proposition">
                <h2 className="title proposition__title">{title}</h2>
                    {
                        products.length > 1 ? (
                            <ProductSlider products={products} />
                        ) : (
                            <ul className='proposition__list'>
                                 {products.map(item => (
                                    <Product
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        img={item.images}
                                        price={item.price}
                                        promo={item.promo}
                                    />
                                ))}
                            </ul>
                        )
                    }          
                </div>
            )}
        </section>
    )
}

export default Proposition;