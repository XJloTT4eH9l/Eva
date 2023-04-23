import { useNavigate }  from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import backIcon from '../../assets/img/arrow.svg';
import './LinkBack.scss';

const LinkBack = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <div
            className='link-back'
            onClick={handleGoBack}
        >
            <img src={backIcon} className='link-back__img' alt='Go back' />
            <span>{t("nav.back")}</span>
        </div>
    )
}

export default LinkBack