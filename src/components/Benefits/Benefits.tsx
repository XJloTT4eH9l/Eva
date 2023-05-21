import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

import './Benefits.scss';

interface BenefitsProps {
    title: string;
    sections: {
        title: string;
        info: {
            name: string | null;
            text: string | null;
            img: string | null;
        }[];
    }[];
}

const Benefits:FC<BenefitsProps> = ({ title, sections }) => {
    const innerWidth = window.innerWidth;
    const [ref, inView] = useInView({threshold: innerWidth < 900 ? 0.1 : 0.3, triggerOnce: true});
    return (
        <section className="benefits">
            <div className="container">
                <h2 className={inView ? "benefits__heading benefits__heading--active" : "benefits__heading"}>{title}</h2>
                <ul className='benefits__inner' ref={ref}>
                    {sections.map(section => (
                        <li key={section.title} className={inView ? "benefits__item benefits__item--active" : "benefits__item"}>
                            <h3 className='benefits__title'>{section.title}</h3>
                            <ul className='benefits__list'>
                                {section.info.map((item, i) => (
                                    <li className='benefits__part' key={i}>
                                        { item.img && <img src={item.img} alt='' /> }
                                        { item.name && <p>{item.name}</p> }
                                        { item.text && <span>{item.text}</span> }
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Benefits;