import spinnerImg from '../../assets/img/spinner.svg';
import './Spinner.scss';

const Spinner = () => {
    return (
        <img className='spinner' src={spinnerImg} alt='Заванаження...' />
    )
}

export default Spinner;