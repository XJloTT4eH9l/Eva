import { useNavigate }  from 'react-router-dom';
import backIcon from '../../assets/img/arrow.svg';
import './LinkBack.scss';

const LinkBack = () => {
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
            <span>Назад</span>
        </div>
    )
}

export default LinkBack