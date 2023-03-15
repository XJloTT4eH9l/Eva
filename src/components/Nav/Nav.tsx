import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

interface NavProps {
    type: string;
    setMobileMenuOpen: (item: boolean) => void;
}

const Nav:FC<NavProps> = ({ type, setMobileMenuOpen }) => {
    return (
        <nav className={type === 'desktop' ? "nav" : "nav--mobile"}>
            <ul className={type === 'desktop' ? "nav__list" : "nav__list--mobile"}>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/'>Головна</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/catalog'>Каталог</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/about'>Про нас</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/contacts'>Контакти</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;