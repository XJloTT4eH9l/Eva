import { useState, useEffect, FC } from 'react';
import { IProduct } from '../../types/types';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import './Catalog.scss';

interface CatalogProps {
    products?: IProduct[];
    setProducts: (products: IProduct[]) => void;
}

const Catalog:FC<CatalogProps> = ({ products, setProducts}) => {
    const [sort, setSort] = useState<string>('title');
    const [sortingOpen, setSortingOpen] = useState<boolean>(false);

    const sortOptions = [
        {id: 'price-low', label: 'По ціні(від меншої до більшої)'},
        {id: 'price-top', label: 'По ціні(від більшої до меншої)'},
        {id: 'title', label: 'По назві'}
    ];

    const onSort = (id: string) => {
        setSort(id);
        setSortingOpen(false);
    }

    useEffect(() => {
        // const getProducts = (link: string) => {
        //     setLoading(true);
        //     setProducts([
        //         {id: 45, title: 'Зброджений яблучний сік', price: 15.00, img: ['https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg']},
        //         {id: 46, title: 'Зброджений яблучний сік', price: 15.00, img: ['https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg']},
        //         {id: 47, title: 'Зброджений апельсиновий сік', price: 15.00, img: ['https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg']}
        //     ])
        //     setLoading(false);
        // }

        // getProducts('link');
    }, [])
    return (
        <div className='catalog'>
            <ul className="catalog__list">
            {
                products?.map(product => (
                    <Product
                        key={product.id} 
                        id={product.id}
                        title={product.title}
                        img={product.img}
                        price={product.price}
                    />
                ))
            }
            </ul>
            <div className={sortingOpen ? 'sorting sorting--active' : 'sorting'}>
                <button 
                    onClick={() => setSortingOpen(prev => !prev)} 
                    className={sortingOpen ? 'sorting__btn sorting__btn--active' : 'sorting__btn'}
                >
                    Сортування
                </button>
                <ul className={sortingOpen ? 'sorting__list sorting__list--active' : 'sorting__list'}>
                    {sortOptions.map(item => {
                        const isActive = item.id === sort;
                        return( 
                            <li
                                key={item.id} 
                                className={isActive ? 'sorting__item sorting__item--active' : 'sorting__item'}
                                onClick={() => onSort(item.id)}
                            >
                                {item.label}
                            </li>
                        )
                    })}
                </ul>
                {/* <div
                    onClick={() => setSortingOpen(false)} 
                    className={sortingOpen ? 'sorting__overlay sorting__overlay--active' : 'sorting__overlay'} 
                /> */}
            </div>
        </div>
    )
}

export default Catalog;