import { useInView } from 'react-intersection-observer';

import biola from '../../assets/img/biola.png';
import danon from '../../assets/img/danon.png';
import sandora from '../../assets/img/sandora.png';
import award from '../../assets/img/award.png';

import './Benefits.scss';

const Benefits = () => {
    const [ref, inView] = useInView({threshold: 0.3, triggerOnce: true});
    return (
        <section className="benefits">
            <div className="container">
                <h2 className='benefits__heading'>Переваги</h2>
                <ul className='benefits__inner' ref={ref}>
                    <li className={inView ? "benefits__item benefits__item--active" : "benefits__item"}>
                        <h3 className='benefits__title'>Виробнича потужність</h3>
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
                        <h3 className='benefits__title'>Наші клієнти</h3>
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
                        <h3 className='benefits__title'>Нагороди</h3>
                        <ul className='benefits__list'>
                            <li className='benefits__part'>
                                <img src={award} alt='Top Ukranian Award'/>
                                <p>Всеукраїнське дослідження кращих товарів та послуг</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Benefits;