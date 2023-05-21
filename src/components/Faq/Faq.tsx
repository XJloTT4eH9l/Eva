import { FC } from 'react';
import { useState, useEffect } from "react";
import arrow from '../../assets/img/arrow.svg';
import './Faq.scss';

interface FaqProps {
    title: string;
    sections: {
        title: string;
        text: string;
        active: boolean;
    }[]
}
interface FaqQuestions {
    title: string;
    text: string;
    active: boolean;
}


const Faq:FC<FaqProps> = ({ title, sections }) => {
    const [faqQuestions, setFaqQuestions] = useState<FaqQuestions[]>();

    const setActiveQuestion = (title: string) => {
        const questions = faqQuestions?.map(item => {
            if(title === item.title) {
                return (
                    {...item, active: !item.active}
                )
            } else {
                return (
                    {...item, active: false}
                )
            }
        });
        setFaqQuestions(questions);
    }

    useEffect(() => {
        setFaqQuestions(sections)
    }, [])

    return (
        <section className="faq" id="faq">
            <div className="container">
                <h2 className="faq__title">{title}</h2>
                <ul className="faq__questions">
                    {faqQuestions && (
                        faqQuestions.map(item => (
                            <li 
                                key={item.title} 
                                className={item.active ? 'faq__item faq__item--active' : 'faq__item'}
                                onClick={() => setActiveQuestion(item.title)}
                            >
                                <div className="faq__question"> 
                                    <h3 className='faq__heading'>{item.title}</h3>
                                    <div className={item.active ? "faq__wrapper faq__wrapper--active" : "faq__wrapper"}>
                                        <p className={item.active ? 'faq__answer faq__answer--active' : 'faq__answer'}>{item.text}</p>
                                    </div>
                                </div>
                                <img 
                                    src={arrow}
                                    alt='Відкрити'
                                    className={item.active ? 'faq__arrow faq__arrow--active' : 'faq__arrow'} 
                                />
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </section>
    )
}

export default Faq;