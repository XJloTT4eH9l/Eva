import { FC } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/logo.svg';
import './Logo.scss';

interface LogoProps {
    type: string;
    classes?: string;
}

const Logo:FC<LogoProps> = ({ type }) => {
    const { t } = useTranslation();
    return (
        <Link to ='/home' className={type === 'footer' ? 'logo logo--footer' : 'logo logo--header'}>
            <img className={type === 'footer' ? 'logo__img--footer' : 'logo__img logo__img--header'} src={logo} alt='Eva' />
            <span className={type === 'footer' ?  'logo__text logo__text--footer' : 'logo__text'}>{t("contact_page.titleCompany.info")}</span>
        </Link>
    )
}

export default memo(Logo);