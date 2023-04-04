import { FC } from 'react';
import Product from '../Product/Product';
import ProductSlider from '../ProductSlider/ProductSlider';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IProduct } from '../../types/types';
import './RecentlyViewed.scss';

interface PropositionProps {

}

const RecentlyViewed:FC<PropositionProps> = () => {
    const recents = useAppSelector(state => state.recentlyViewed.recentlyViewed);

    return (
        <section className="recently-viewed">
            {recents.length > 0 && (
                <div className="container container--recently-viewed">
                <h2 className="title">Нещодавно переглянуті</h2>
                    {
                        recents.length > 1 ? (
                            <ProductSlider products={recents} />
                        ) : (
                            <ul className='proposition__list'>
                                 {recents.map(item => (
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

export default RecentlyViewed;