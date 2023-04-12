import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IProductDetail, ICategory } from '../../types/types';
import { API_CATEGORIES, API_CATEGORIES_PRODUCTS } from '../../constants/api';
import axios from 'axios';

import LinkBack from "../../components/LinkBack/LinkBack";
import Catalog from "../../components/Catalog/Catalog";
import Spinner from '../../components/Spinner/Spinner';

import './CategoryPage.scss';

const CategoryPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState<IProductDetail[]>();
    const [categories, setCategories] = useState<ICategory[]>();
    const [sortingOpen, setSortingOpen] = useState<boolean>(false);
    const [sort, setSort] = useState<string>('title-down');
    const [loading, setLoading] = useState<boolean>(false);

    const sortOptions = [
        {id: 'price-down', label: 'По ціні (від меншої до більшої)'},
        {id: 'price-up', label: 'По ціні (від більшої до меншої)'},
        {id: 'title-down', label: 'По назві (А-Я)'},
        {id: 'title-up', label: 'По назві (Я-А)'},
        {id: 'date-low', label: 'По даті (Спочатку старі)'},
        {id: 'date-up', label: 'По даті (Спочатку нові)'},
    ];

    const onSort = (sort: string) => {
        setSort(sort);
        switch(sort) {
            case 'price-up':
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1' + '&sort_param=down&sort_field=price');
                break
            case 'prise-down':
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1' + '&sort_param=up&sort_field=price');
                break
            case 'title-up':
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1' + '&sort_param=down&sort_field=title');   
                break
            case 'title-down':
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1' + '&sort_param=up&sort_field=title');
                break
            case 'date-up':
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1' + '&sort_param=down&sort_field=date');   
                break
            case 'date-down':
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1' + '&sort_param=up&sort_field=date');   
                break
            default:
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1&page_size=24&page=1');
                break
        }
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
        try {
            setLoading(true);
            const res = await axios.get(link);
            if(res.status === 200) {
                setProducts(res.data.products);
            }
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + '?lang_id=1&page_size=24&page=1');
        getCategories();
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