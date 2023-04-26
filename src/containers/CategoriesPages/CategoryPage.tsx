import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { IProductDetail, ICategory } from '../../types/types';
import { API_CATEGORIES, API_CATEGORIES_PRODUCTS } from '../../constants/api';
import axios from 'axios';

import LinkBack from "../../components/LinkBack/LinkBack";
import Catalog from "../../components/Catalog/Catalog";
import Spinner from '../../components/Spinner/Spinner';
import arrow from '../../assets/img/arrow.svg';

import './CategoryPage.scss';

const CategoryPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [products, setProducts] = useState<IProductDetail[]>();
    const [categories, setCategories] = useState<ICategory[]>();

    const [pageNum, setPageNum] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const [lastPage, setLastPage] = useState<number>(0);

    const [sortingOpen, setSortingOpen] = useState<boolean>(false);
    const [sort, setSort] = useState<string>('title-down');
    const [sortParam, setSortParam] = useState<string>('up');
    const [sortField, setSortField] = useState<string>('title');

    const [loading, setLoading] = useState<boolean>(false);
    const currentLanguage = useAppSelector(state => state.languages.curentLang);

    const sortOptions = [
        {id: 'price-down', label: t("sorting.price_down")},
        {id: 'price-up', label: t("sorting.price_up")},
        {id: 'title-down', label: t("sorting.title_down")},
        {id: 'title-up', label: t("sorting.title_up")},
        {id: 'date-down', label: t("sorting.date_down")},
        {id: 'date-up', label: t("sorting.date_up")},
    ];

    const onSort = (sort: string) => {
        setSort(sort);
        switch(sort) {
            case 'price-up':
                setSortField('price');
                setSortParam('down');
                setPageNum(1);
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}` + '&sort_param=down&sort_field=price' + '&page_size=2&page=1');
                break
            case 'prise-down':
                setSortField('price');
                setSortParam('up');
                setPageNum(1);
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}` + '&sort_param=up&sort_field=price' + '&page_size=2&page=1');
                break
            case 'title-up':
                setSortField('title');
                setSortParam('down');
                setPageNum(1);
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}` + '&sort_param=down&sort_field=title' + '&page_size=2&page=1');   
                break
            case 'title-down':
                setSortField('title');
                setSortParam('up');
                setPageNum(1);
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}` + '&sort_param=up&sort_field=title' + '&page_size=2&page=1');
                break
            case 'date-up':
                setSortField('date');
                setSortParam('down');
                setPageNum(1);
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}` + '&sort_param=down&sort_field=date' + '&page_size=2&page=1');   
                break
            case 'date-down':
                setSortField('date');
                setSortParam('down');
                setPageNum(1);
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}` + '&sort_param=up&sort_field=date' + '&page_size=2&page=1');   
                break
            default:
                getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}&page_size=2&page=${pageNum}`);
                break
        }
        setSortingOpen(false);
    }

    const getCategories = async () => {
        try {
            const res = await axios.get(API_CATEGORIES + `?lang_id=1`);
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
                const pags = Math.ceil(res.data.quantity_products / 2);
                const pagsArray = [];

                for(let i = 1; i <= pags; i++) {
                    pagsArray.push(i);
                }
                setPages(pagsArray);
                setLastPage(pagsArray.length);

            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onNav = (page: number) => {
        setPageNum(page);
        getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}&sort_param=${sortParam}&sort_field=${sortField}&page_size=2&page=${page}`);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}&sort_param=${sortParam}&sort_field=${sortField}&page_size=2&page=1`);
        getCategories();
    }, [])

    useEffect(() => {
        getProducts(API_CATEGORIES_PRODUCTS + `id=${id}` + `?lang_id=${currentLanguage.id}&sort_param=${sortParam}&sort_field=${sortField}&page_size=2&page=1`);
    }, [currentLanguage])

    return (
       <section className="categories-page">
            <div className="container">
                {loading ? <Spinner /> : (
                    <>
                        <div className="bread-crumbs">
                            <Link className='bread-crumbs__item' to='/'>{t("nav.main")}</Link>
                            <Link className='bread-crumbs__item' to='/categories'>{t("nav.categories")}</Link>
                            <span className='bread-crumbs__item'>{categories?.filter(item => item.id === Number(id))[0].title}</span>
                        </div>
                        <LinkBack />
                        <div className='d-flex'>
                            <h1 className="title">{categories?.filter(item => item.id === Number(id))[0].title}</h1>                            <div className={sortingOpen ? 'sorting sorting--active' : 'sorting'}>
                                <button 
                                    onClick={() => setSortingOpen(prev => !prev)} 
                                    className={sortingOpen ? 'sorting__btn sorting__btn--active' : 'sorting__btn'}
                                >
                                    {t("sorting.title")}
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

                        <>
                        {pages.length > 1 && (
                            <ul className='categories-page__nav'>
                                {pages.map(page => {
                                    const isActive = page === pageNum;
                                    return (
                                        <li 
                                            key={page} 
                                            className={isActive ?  'categories-page__page-num categories-page__page-num--active': 'categories-page__page-num'} 
                                            onClick={() => onNav(page)}
                                        >
                                            {page}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        </>
                    </>
                )}
            </div>
       </section>
    )
}

export default CategoryPage;