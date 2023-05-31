import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './Greeting.scss';

interface GreetingProps {
    title: string;
    text: string;
    img: string;
}

const Greeting:FC<GreetingProps> = ({ title, text, img }) => {
    const { t } = useTranslation();
    const [ref, inView] = useInView({threshold: 0.5, triggerOnce: true});
    return (
        <div ref={ref} className="greeting">
            <div className="container">
                <div className="greeting__inner">
                    <div className={inView ? "greeting__left greeting__left--active" : 'greeting__left'}>
                        <h1 className='greeting__title'>{title}</h1>
                        <p className="greeting__text">{text}</p>
                        <Link className='greeting__link' to='/home'>{t("nav.to_store")}</Link>
                        <a className='greeting__link greeting__link--outline' href='#faq'>{t("nav.to_faq")}</a>
                    </div>
                    <img className={inView ? 'greeting__img greeting__img--active' : 'greeting__img'} src={img} alt={title} />
                </div>
            </div>
        </div>
    )
}

export default Greeting;