import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import './AboutBlock.scss';

interface AboutBlockProps {
    sections: {
      title: string;
      text: string;
      img: string;
    }[];
}

const AboutBlock:FC<AboutBlockProps> = ({ sections }) => {
    const innerWidth = window.innerWidth;
    const [ref, inView] = useInView({threshold: innerWidth < 900 ? 0.1 : 0.2, triggerOnce: true});
    return (
        <div className="about-block" ref={ref}>
            <div className="container">
                <div className={inView ? "about-block__inner about-block__inner--active" : "about-block__inner"}>
                    {sections.map(section => (
                        <div className="about-block__section" key={section.title}>
                            <div className='about-block__content'>
                                <h3 className='about-block__title'>{section.title}</h3>
                                <p className='about-block__text'>{section.text}</p>
                            </div>
                            <img className='about-block__img' src={section.img} alt={section.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutBlock;