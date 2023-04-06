import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IProduct, ICategory } from '../../types/types';
import { API_CATEGORIES, API_CATEGORIES_PRODUCTS } from '../../constants/api';
import axios from 'axios';

import LinkBack from "../../components/LinkBack/LinkBack";
import Catalog from "../../components/Catalog/Catalog";
import Spinner from '../../components/Spinner/Spinner';

import './CategoryPage.scss';

const CategoryPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState<IProduct[]>();
    const [categories, setCategories] = useState<ICategory[]>();
    const [sortingOpen, setSortingOpen] = useState<boolean>(false);
    const [sort, setSort] = useState<string>('title');
    const [loading, setLoading] = useState<boolean>(false);

    const sortOptions = [
        {id: 'price-low', label: 'По ціні(від меншої до більшої)'},
        {id: 'price-top', label: 'По ціні(від більшої до меншої)'},
        {id: 'title', label: 'По назві'}
    ];

    const onSort = (id: string) => {
        setSort(id);
        setSortingOpen(false);
    }

    const getCategories = async () => {
        try {
            const res = await axios.get(API_CATEGORIES + '?lang_id=1');
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getProducts = async (link: string) => {
        // request
        try {
            setLoading(true);
            const res = await axios.get(link);
            if(res.status === 200) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.log(error);
        }
        // setProducts([
        //     {id: 45, title: 'Яблучний сік', price: 15.00, images: ['https://cdn.segodnya.ua/i/original/media/image/5d5/a50/dce/5d5a50dce8785.jpg.webp']},
        //     {id: 46, title: 'Апельсиновий сік', price: 18.00, images: ['https://cbo.org.ua/wp-content/uploads/apelsinoviy-sok2.jpg']},
        //     {id: 47, title: 'Персиковий сік', price: 20.00, images: ['https://zelensad.com/upload/iblock/df0/df0c1cadb14ba8b4e529a8fe0e335d9b.jpg']},
        //     {id: 48, title: 'Гранатовий Сік', price: 23.00, images: ['https://shuba.life/static/content/thumbs/740x493/f/57/khncn4---c740x493x50px50p-c740x493x50px50p-up--63b2d6bfdeb759b6713d0967ff2b457f.jpg']},
        // ])
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1&page_size=24&page=1');
        getCategories();
        setLoading(false);
    }, [])
    return (
       <section className="categories-page">
            <div className="container">
                {loading ? <Spinner /> : (
                    <>
                        <div className="bread-crumbs">
                            <Link className='bread-crumbs__item' to='/'>Головна</Link>
                            <Link className='bread-crumbs__item' to='/categories'>Категорії</Link>
                            <span className='bread-crumbs__item'>{categories?.filter(item => item.id === Number(id))[0].title}</span>
                        </div>
                        <LinkBack />
                        <div className='d-flex'>
                            <h1 className="title">{categories?.filter(item => item.id === Number(id))[0].title}</h1>                            <div className={sortingOpen ? 'sorting sorting--active' : 'sorting'}>
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
                            </div>
                        </div>
                        <Catalog products={products} />
                    </>
                )}
            </div>
       </section>
    )
}

export default CategoryPage;