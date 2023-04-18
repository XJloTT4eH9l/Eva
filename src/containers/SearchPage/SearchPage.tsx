import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IProductDetail } from '../../types/types';
import { API_SEARCH_CATEGORY } from '../../constants/api';
import { useDebounce } from '../../hooks/useDebounce';
import axios from 'axios';
import Catalog from '../../components/Catalog/Catalog';
import searchIcon from '../../assets/img/search-icon.png';
import './SearchPage.scss';
import Spinner from '../../components/Spinner/Spinner';

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
    const debouncedSearch = useDebounce(searchValue, 500);

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
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1' + '&sort_param=down&sort_field=price');
                break
            case 'prise-down':
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1' + '&sort_param=up&sort_field=price');
                break
            case 'title-up':
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1' + '&sort_param=down&sort_field=title');   
                break
            case 'title-down':
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1' + '&sort_param=up&sort_field=title');
                break
            case 'date-up':
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1' + '&sort_param=down&sort_field=date');   
                break
            case 'date-down':
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1' + '&sort_param=up&sort_field=date');   
                break
            default:
                getSearchProducts(API_SEARCH_CATEGORY + debouncedSearch  + '?lang_id=1&page_size=24&page=1');
                break
        }
        setSortingOpen(false);
    }

    const getSearchProducts = async (link = 'base') => {
        try {
            setLoading(true);

            if(debouncedSearch === '') {
                setSearchList([]);
            } else {
                const res = await axios.get(link === 'base' ? API_SEARCH_CATEGORY + debouncedSearch + '?lang_id=1&page_size=24&page=1' : link);
                if(res.data.products === null) {
                    setSearchList([]);
                } else {
                    setSearchList(res.data.products);
                    setSearchQuanity(res.data.quantity_products);
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

    useEffect(() => {
        getSearchProducts();
    }, [debouncedSearch]);

    useEffect(() => {
        return () => {
            setSearchValue('');
        }
    }, [])

    return (
        <section className='search-page'>
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/'>Головна</Link>
                    <span className='bread-crumbs__item'>Пошук</span>
                </div>
                <h1 className='title'>{searchValue.length > 0 ? (`Пошук по запиту: "${searchValue}"`) : 'Пошук'}</h1>
                <div className='search-page__inner'>
                    <div className='search-page__input-container'>
                        <input 
                            className='search-page__input' 
                            type='text' 
                            value={searchValue}
                            onChange={handleChange}
                            placeholder='Пошук: ведіть артикул або назву товару'
                        />
                        <img src={searchIcon} alt='Пошук' />
                    </div>
                    <div className='search-page__sorting-container'>
                        <button 
                            onClick={() => setSortingOpen(prev => !prev)} 
                            className={sortingOpen ? 'sorting__btn sorting__btn--active' : 'sorting__btn'}
                        >
                            Сортування
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
                {loading ? <Spinner /> : (
                    <>
                        <Catalog products={searchList} />
                        {searchList.length === 0 && searchValue.length > 0 && (
                            <h2>Нічого не знайдено</h2>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default SearchPage