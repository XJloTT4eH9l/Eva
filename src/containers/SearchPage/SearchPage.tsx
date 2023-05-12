import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IProductDetail } from '../../types/types';
import { API_SEARCH_CATEGORY } from '../../constants/api';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Catalog from '../../components/Catalog/Catalog';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import searchIcon from '../../assets/img/search-icon.png';
import './SearchPage.scss';

interface SearchPageProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    searchList: IProductDetail[];
    setSearchList: (list: IProductDetail[]) => void;
}

const SearchPage:FC<SearchPageProps> = ({ searchValue, setSearchValue, setSearchList, searchList }) => {
    const [searchQuanity, setSearchQuanity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState<string>('title-down');
    const [sortingOpen, setSortingOpen] = useState<boolean>(false);
    const [sortField, setSortField] = useState<string>('title');
    const [sortParam, setSortParam] = useState<string>('up');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);

    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    const debouncedSearch = useDebounce(searchValue, 500);
    const { t } = useTranslation();

    const sortOptions = [
        {id: 'price-down', label: t("sorting.price_down")},
        {id: 'price-up', label: t("sorting.price_up")},
        {id: 'title-down', label: t("sorting.title_down")},
        {id: 'title-up', label: t("sorting.title_up")},
        {id: 'date-down', label: t("sorting.date_down")},
        {id: 'date-up', label: t("sorting.date_up")},
    ];

    const onSort = (sort: string) => {
        setCurrentPage(1);
        setSort(sort);
        switch(sort) {
            case 'price-up':
                setSortField('price');
                setSortParam('down');
                break
            case 'price-down':
                setSortField('price');
                setSortParam('up');
                break
            case 'title-up':
                setSortField('title');
                setSortParam('down');
                break
            case 'title-down':
                setSortField('title');
                setSortParam('up');
                break
            case 'date-up':
                setSortField('date');
                setSortParam('down');
                break
            case 'date-down':
                setSortField('date');
                setSortParam('up');
                break
            default:
                setSortField('title');
                setSortParam('up');
                console.log('title');
                break
        }
        setSortingOpen(false);
    }

    const getSearchProducts = async () => {
        try {
            setLoading(true);

            if(debouncedSearch === '') {
                setSearchList([]);
                setPages([]);
            } else {
                const res = await axios.get(API_SEARCH_CATEGORY + debouncedSearch + `?lang_id=${currentLanguage.id}&sort_param=${sortParam}&sort_field=${sortField}&page_size=24&page=${currentPage}`);

                if(res.status === 200) {
                    setSearchList(res.data.products);
                    setSearchQuanity(res.data.quantity_products);
                    
                    const pagesItems = Math.ceil(res.data.quantity_products / 24);
                    const pagesArray = [];

                    for(let i = 1; i <= pagesItems; i++) {
                        pagesArray.push(i);
                    }

                    setPages(pagesArray);
                } else {
                    setSearchList([]);
                }
            }

            setLoading(false);
        } catch (error) {
            alert('Виникли проблеми, спробуйте пізніше');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const onNav = (page: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    }

    useEffect(() => {
        getSearchProducts();
    }, [debouncedSearch, currentLanguage, currentPage, sort]);


    useEffect(() => {
        return () => {
            setSearchValue('');
        }
    }, [])

    return (
        <section className='search-page'>
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/home'>{t("nav.main")}</Link>
                    <span className='bread-crumbs__item'>{t("nav.search")}</span>
                </div>
                <h1 className='title'>{searchValue.length > 0 ? (`${t("search_page.search_by_request")} "${searchValue}"`) : t("nav.search")}</h1>
                {searchList.length > 0 && (
                    <p className='search-page__count'>{t("search_page.found")} {searchQuanity} {t("search_page.products")}</p>
                )}
                <div className='search-page__inner'>
                    <div className='search-page__input-container'>
                        <input 
                            className='search-page__input' 
                            type='text' 
                            value={searchValue}
                            onChange={handleChange}
                            placeholder={t("search_page.placeholder") || ''}
                        />
                        <img src={searchIcon} alt='Пошук' />
                    </div>
                    <div className='search-page__sorting-container'>
                        <button 
                            onClick={() => setSortingOpen(prev => !prev)} 
                            className={sortingOpen ? 'sorting__btn sorting__btn--active' : 'sorting__btn'}
                        >
                           {t("sorting.title")}
                        </button>
                        <ul className={sortingOpen ? 'sorting__list sorting__list--active search-page__sorting' : 'sorting__list search-page__sorting'}>
                            {sortOptions.map(item => {
                                const isActive = item.id === sort;
                                return( 
                                    <li
                                        key={item.id} 
                                        className={isActive ? 'sorting__item sorting__item--active' : 'sorting__item '}
                                        onClick={() => onSort(item.id)}
                                    >
                                        {item.label}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div 
                    className={sortingOpen ? 'categories-page__overlay categories-page__overlay--active' : 'categories-page__overlay'}
                    onClick={() => setSortingOpen(false)}
                />
                {loading ? <Spinner /> : (
                    <>
                        <Catalog products={searchList} />
                        {searchList.length === 0 && searchValue.length > 0 && (
                            <h2>{t("search_page.nothing_found")}</h2>
                        )}

                        {pages.length > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                pages={pages}
                                onNav={onNav} 
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default SearchPage