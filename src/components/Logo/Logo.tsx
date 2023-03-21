import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import './Logo.scss';

interface LogoProps {
    type: string;
}

const Logo:FC<LogoProps> = ({ type }) => {
    return (
        <Link to ='/' className={type === 'footer' ? "logo logo--footer" : 'logo'}>
            <img className={type === 'footer' ? 'logo__img--footer' : 'logo__img'} src={logo} alt='Eva' />
            <span className='logo__text'>ТОВ "Витамин2015"</span>
        </Link>
    )
}

export default Logo;