import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import BurgerIcon from '../BurgerIcon/BurgerIcon';

import cartIcon from '../../assets/img/cart.svg';
import './Header.scss';

const Header:FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Logo type='header' />
                    <Nav type='desktop' setMobileMenuOpen={setMobileMenuOpen} />
                    <BurgerIcon mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

                    <div className={mobileMenuOpen ? 'header__mobile-menu header__mobile-menu--active' : 'header__mobile-menu'}>
                        <Nav type='mobile' setMobileMenuOpen={setMobileMenuOpen} />
                    </div>
                    
                    <NavLink className='header__cart' to='/cart'>
                        <img src={cartIcon} alt='Корзина' className='header__cart-img'/>
                        <span className='header__cart-text'>650 грн</span>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;