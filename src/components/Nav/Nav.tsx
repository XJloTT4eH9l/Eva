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
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/home'>{t("nav.main")}</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/categories'>{t("nav.categories")}</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/'>{t("nav.about")}</NavLink>
                </li>
                <li className={type === 'desktop' ? "nav__item" : "nav__item--mobile"}>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='nav__link' to='/contacts'>{t("nav.contacts")}</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;