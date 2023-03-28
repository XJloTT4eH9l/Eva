import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import BurgerIcon from '../BurgerIcon/BurgerIcon';
import SideCart from '../SideCart/SideCart';

import cartIcon from '../../assets/img/cart.svg';
import './Header.scss';

const Header:FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const cartItems = useAppSelector(state => state.cartItems.cartItems);
    const sum = cartItems.reduce((sum, item) => sum + item.price * item.quanity, 0);

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
                    <Nav type='desktop' setMobileMenuOpen={setMobileMenuOpen} />
                    <BurgerIcon mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

                    <div className={mobileMenuOpen ? 'header__mobile-menu header__mobile-menu--active' : 'header__mobile-menu'}>
                        <Nav type='mobile' setMobileMenuOpen={setMobileMenuOpen} />
                    </div>
                    
                    <div className='header__cart' onClick={() => setCartOpen(true)}>
                        <img src={cartIcon} alt='Корзина' className='header__cart-img'/>
                        <span className='header__cart-text'>{sum} грн</span>
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

export default Header;