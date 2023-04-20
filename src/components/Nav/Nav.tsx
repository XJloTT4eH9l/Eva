import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Nav.scss';

interface NavProps {
    type: string;
    setMobileMenuOpen: (item: boolean) => void;
}

const Nav:FC<NavProps> = ({ type, setMobileMenuOpen }) => {
    const { t } = useTranslation();
    return (
        <nav className={type === 'desktop' ? "nav" : "nav--mobile"}>
            <ul className={type === 'desktop' ? "nav__list" : "nav__list--mobile"}>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/'>{t("header.nav.main")}</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/categories'>{t("header.nav.category")}</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/about'>{t("header.nav.about")}</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/contacts'>{t("header.nav.contacts")}</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;