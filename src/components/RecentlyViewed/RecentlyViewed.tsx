import { FC } from 'react';
import Product from '../Product/Product';
import ProductSlider from '../ProductSlider/ProductSlider';
import { useAppSelector } from '../../hooks/reduxHooks';
import './RecentlyViewed.scss';

interface RecentlyViewedProps {
    type: string;
    id?: number;
}

const RecentlyViewed:FC<RecentlyViewedProps> = ({ type, id }) => {
    const recents = useAppSelector(state => state.recentlyViewed.recentlyViewed);

    return (
        <section className={type === 'main' ? "recently-viewed recently-viewed--main" : "recently-viewed"}>
            {recents.length > 0 && (
                <div className="container container--recently-viewed">
                <h2 className="title proposition__title">Нещодавно переглянуті</h2>
                    {
                        recents.length > 1 ? (
                            <ProductSlider products={recents} />
                        ) : (
                            <ul className='proposition__list'>
                                {
                                    recents.map((item) => {
                                        return (
                                            <Product
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                img={item.images}
                                                price={item.price} 
                                            />
                                        )
                                    })
                                
                                }
                            </ul>
                        )
                    }          
                </div>
            )}
        </section>
    )
}

export default RecentlyViewed;