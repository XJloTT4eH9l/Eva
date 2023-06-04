import { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { IProductDetail } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { API_PRODUCTS } from '../../constants/api';
import { setCart } from '../../store/cartSlice';
import axios from 'axios';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import BurgerIcon from '../BurgerIcon/BurgerIcon';
import SideCart from '../SideCart/SideCart';
import LanguageChange from '../LanguageChange/LanguageChange';
import Search from '../../components/Search/Search';

import cartIcon from '../../assets/img/cart.svg';
import loginIcon from '../../assets/img/login.svg';
import './Header.scss';

interface HeaderProps {
    cartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    searchList: IProductDetail[];
    setSearchList: (list: IProductDetail[]) => void;
}

const Header:FC<HeaderProps> = ({ cartOpen, setCartOpen, searchValue, setSearchValue, searchList, setSearchList }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    const cartItemsIds = cartItems.map(item => item.id);
    const sum = cartItems.reduce((sum, item) => item.promo?.promo_price ? sum + item.promo.promo_price * item.quanity : sum + item.price * item.quanity, 0);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onCart = async () => {
        setCartOpen(true);
        try {
            if(cartItems.length > 0) {
                const res = await axios.get<IProductDetail[]>(API_PRODUCTS + cartItemsIds.join(',') + `&lang_id=${currentLanguage.id}`);
                if(res.data.length > 0) {
                    const cartItemsNew = cartItems.map(item => {

                        for(let i = 0; i < res.data.length; i++) {
                            if(item.id === res.data[i].id) {
                                return (
                                    {...item, title: res.data[i].title, promo: res.data[i].promo, price: res.data[i].price}
                                )
                            }
                        }

                        return item
                    });
                    dispatch(setCart(cartItemsNew));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const close = () => {
        setMobileMenuOpen(false);
        setCartOpen(false);
    }

    useEffect(() => {
        cartOpen || mobileMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow ='visible';
    }, [cartOpen, mobileMenuOpen])

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Logo type='header' />

                    <div className='header__column'>
                        <div className='header__top'>
                            <Nav type='desktop' setMobileMenuOpen={setMobileMenuOpen} />
                            <BurgerIcon mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                            {/* <button className='header__login header__login--comp'>
                                <img src={loginIcon} alt='Увійти'/>
                            </button> */}
                            <LanguageChange  setMobileMenuOpen={setMobileMenuOpen} />
                            <div className={mobileMenuOpen ? 'header__mobile-menu header__mobile-menu--active' : 'header__mobile-menu'}>
                                <Search 
                                    type='mobile' 
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    searchList={searchList} 
                                    setSearchList={setSearchList} 
                                    setMobileMenuOpen={setMobileMenuOpen}
                                />
                                <Nav type='mobile' setMobileMenuOpen={setMobileMenuOpen} />
                                <LanguageChange type='mobileChange' setMobileMenuOpen={setMobileMenuOpen} />
                                <button className='header__login header__login--tel'>
                                    <img src={loginIcon} alt='Увійти'/>
                                </button>
                            </div>
                        </div>
                        <Search 
                            type='desktop'
                            searchValue={searchValue}
                            setSearchValue={setSearchValue} 
                            searchList={searchList} 
                            setSearchList={setSearchList} 
                            setMobileMenuOpen={setMobileMenuOpen}
                        />
                    </div>

                    <div className='header__cart' onClick={onCart}>
                        <img src={cartIcon} alt='Корзина' className='header__cart-img'/>
                        <span className='header__cart-text'>{sum % 1 !== 0 ? Math.round(sum) : sum} {t("buy_info.uah")}</span>
                        <span className='header__count'>
                            <p>{cartItems.length}</p>
                        </span>
                    </div>
                    <SideCart
                        cartOpen={cartOpen}
                        setCartOpen={setCartOpen} 
                    />
                    <div
                        onClick={close} 
                        className={cartOpen || mobileMenuOpen ? 'overlay overlay--active' : 'overlay'}>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);