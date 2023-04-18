import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { API_SEARCH, API_SEARCH_CATEGORY } from '../../constants/api';
import { IProductDetail } from '../../types/types';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import searchIcon from '../../assets/img/search-icon.png';
import remove from '../../assets/img/close.png';
import './Search.scss';

interface SearchProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    searchList: IProductDetail[] | [];
    setSearchList: (list: IProductDetail[]) => void;
    setMobileMenuOpen: (open: boolean) => void;
    type: string;
}

const Search:FC<SearchProps> = ({ type, searchList, searchValue, setSearchValue, setSearchList, setMobileMenuOpen }) => {
    const [searchQuanity, setSearchQuanity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const debouncedSearch = useDebounce(searchValue, 500);

    const location = useLocation();
    const currentPath = location.pathname;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const getSearchProducts = async () => {
            try {
                setLoading(true);

                if(debouncedSearch === '') {
                    setSearchList([]);
                } else {
                    const res = await axios.get(API_SEARCH_CATEGORY + debouncedSearch + '?lang_id=1&page_size=24&page=1');
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
        getSearchProducts();
    }, [debouncedSearch]);

    return (
        <>
        {currentPath !== '/search' && (
            <div className={type === 'desktop' ? 'search search--desktop' : 'search search--mobile'}>
            <input 
                type='text'
                className='search__input' 
                placeholder='Пошук: ведіть артикул або назву товару'
                value={searchValue}
                onChange={handleChange}
            />
           <img className='search__search-icon' src={searchIcon} alt='Пошук...'/>
           {searchValue.length > 0 && (
                <img 
                    className='search__delete' 
                    src={remove} 
                    alt='Delete'
                    onClick={() => {
                        setSearchValue('');
                        setSearchQuanity(0);
                    }} 
                />
           )}
           <div className='search__inner'>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                    {debouncedSearch.length > 0 && searchList.length === 0 && (
                        <p className='search__text'>Нічого не знайдено</p>
                    )}

                    {searchList.length > 0 && (
                        <ul className='search__product-list'>
                        {searchList.filter((_, i) => i < 5).map(item => (
                            <Link 
                                key={item.id}
                                className='search__item'
                                to={`/product/${item.id}`} 
                                onClick={() => {
                                    setSearchValue('');
                                    setMobileMenuOpen(false);
                                }}
                            >
                               <img src={item.images[0]} alt={item.title} />
                               <h2>{item.title}</h2>
                               <span className='search__barcode'>Артикул: {item.barcode}</span>
                               {item.promo?.promo_price ? (
                                <div>
                                    <p className='search__price search__price--promo'>{item.promo.promo_price} грн</p>
                                    <p className='search__price search__price--old'>{item.price} грн</p>
                                </div>
                               ) : (<p className='search__price'>{item.price} грн</p>)}
                            </Link>
                        ))}
                        </ul>
                    )}
                    </>
                )}
            </div>
            {searchQuanity > 5 && searchValue.length > 0 &&  (
                <div className='search__summary'>
                    <p>Всього знайдено {searchQuanity} товарів</p>
                    <Link 
                        to='/search' 
                        className='search__btn' 
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Переглянути всі
                    </Link>
                </div>
            )}
        </div>
        )}
        </>
    )
}

export default Search;