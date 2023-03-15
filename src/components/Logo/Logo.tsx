import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import './Logo.scss';

const Logo:FC = () => {
    return (
        <Link to ='/eva' className="logo">
            <img className='logo__img' src={logo} alt='Eva' />
            <span className='logo__text'>ТОВ "Витамин2015"</span>
        </Link>
    )
}

export default Logo;