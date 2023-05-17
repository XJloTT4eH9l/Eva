import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import orangeJuice from '../../assets/img/main-juice.png';
import './Greeting.scss';

const Greeting = () => {
    const { t } = useTranslation();
    const [ref, inView] = useInView({threshold: 0.5, triggerOnce: true});
    return (
        <div ref={ref} className="greeting">
            <div className="container">
                <div className="greeting__inner">
                    <div className={inView ? "greeting__left greeting__left--active" : 'greeting__left'}>
                        <h1 className='greeting__title'>ВИРОБНИЦТВО КОНЦЕНТРОВАНИХ ФРУКТОВИХ СОКІВ ТА ПЮРЕ</h1>
                        <p className="greeting__text">Ми пропонуємо 100% натуральні соки зі свіжих фруктів та ягід</p>
                        <Link className='greeting__link' to='/home'>{t("nav.to_store")}</Link>
                    </div>
                    <img className={inView ? 'greeting__img greeting__img--active' : 'greeting__img'} src={orangeJuice} alt='juice' />
                </div>
            </div>
        </div>
    )
}

export default Greeting;