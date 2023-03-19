import { FC } from 'react';
import Product from '../Product/Product';
import ProductSlider from '../ProductSlider/ProductSlider';
import { IProduct } from '../../types/types';
import './Proposition.scss';

interface PropositionProps {
    title: string;
    link: string;
    products: IProduct[];
}

const Proposition:FC<PropositionProps> = ({ title, link, products }) => {
   
    return (
        <section className="proposition">
            {products.length > 0 && (
                <div className="container container--proposition">
                <h2 className="title proposition__title">{title}</h2>
                    {
                        products.length > 2 ? (
                            <>
                                <ProductSlider products={products} />
                            </>
                        ) : (
                            <ul className='proposition__list'>
                                 {products.map(item => (
                                    <Product
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        img={item.img}
                                        price={item.price} 
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