import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

import biola from '../../assets/img/biola.png';
import danon from '../../assets/img/danon.png';
import sandora from '../../assets/img/sandora.png';
import award from '../../assets/img/award.png';

import './Benefits.scss';

const Benefits = () => {
    const { t } = useTranslation();
    const innerWidth = window.innerWidth;
    const [ref, inView] = useInView({threshold: innerWidth < 900 ? 0.1 : 0.3, triggerOnce: true});
    return (
        <section className="benefits">
            <div className="container">
                <h2 className={inView ? "benefits__heading benefits__heading--active" : "benefits__heading"}>{t("about_page.benefits")}</h2>
                <ul className='benefits__inner' ref={ref}>
                    <li className={inView ? "benefits__item benefits__item--active" : "benefits__item"}>
                        <h3 className='benefits__title'>{t("about_page.production_capacity")}</h3>
                        <ul className='benefits__list'>
                            <li className='benefits__part'>
                                <p>Переробка яблук у сезон</p>
                                <span>150тыс тонн</span>
                            </li>
                            <li className='benefits__part'>
                                <p>Фруктового пюре за добу</p>
                                <span>200 тонн</span>
                            </li>
                            <li className='benefits__part'>
                                <p>Яблучного концентрату за добу</p>
                                <span>235 тонн</span>
                            </li>
                            <li className='benefits__part'>
                                <p>Аромат фруктовий</p>
                                <span>до 800 тонн</span>
                            </li>
                        </ul>
                    </li>
                    <li className={inView ? "benefits__item benefits__item--active" : "benefits__item"}>
                        <h3 className='benefits__title'>{t("about_page.trust")}</h3>
                        <ul className='benefits__list'>
                            <li className='benefits__part'>
                                <img src={biola} alt='biola'/>
                            </li>
                            <li className='benefits__part'>
                                <img src={danon} alt='danon'/>
                            </li>
                            <li className='benefits__part'>
                                <img src={sandora} alt='sandora'/>
                            </li>
                        </ul>
                    </li>
                    <li className={inView ? "benefits__item benefits__item--active" : "benefits__item"}>
                        <h3 className='benefits__title'>{t("about_page.awards")}</h3>
                        <ul className='benefits__list'>
                            <li className='benefits__part'>
                                <img src={award} alt='Top Ukranian Award'/>
                                <p>Top Ukrainian Award 2020</p>
                                <p className='subtitle'>Всеукраїнське дослідження кращих товарів та послуг</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Benefits;