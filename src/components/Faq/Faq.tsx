import { useState, useEffect } from "react";
import arrow from '../../assets/img/arrow.svg';
import './Faq.scss';

interface FaqQuestions {
    id: number;
    question: string;
    answer: string;
    active: boolean;
}

const Faq = () => {
    const [faqQuestions, setFaqQuestions] = useState<FaqQuestions[]>();
    const questions = [
        {
        id: 1, 
        question: 'Як зробити замовлення?',
        answer: "Зробити замовлення на нашому сайті дуже просто, для цього потрібно натиснути кнопку «Додати в кошик», потім перейти в «Кошик», натиснути «Оформити замовлення» та заповнивнити міні-анкету. Якщо ви бажаєте отримати додаткову консультацію перед покупкою, перейдіть в розділ «Контакти» та подзвоніть на один з предоставлених номерів. Також можна зробити або уточнити замовлення, зв'язавшись по контактному номеру",
        active: false
        },
        {
            id: 2, 
            question: 'Доставка',
            answer: "Ми цінуємо Ваш час, тому обробимо замовлення максимально швидко і відправимо його одним із найнадійніших перевізників (адресу найближчого складу можна дізнатися на сайті перевізника). Доставка продукції по Україні. Нова поштаа, Meest Express, Кур'єрська доставка до дверей, Самовивіз.",
            active: false
        },
        {
            id: 3, 
            question: 'Який склад у наших соків?',
            answer: "Наші соки виготовляються з найкращих свіжих фруктів та овочів. Ми використовуємо лише натуральні і якісні інгредієнти, щоб забезпечити вам смачні та здорові напої. Наш склад включає в себе різноманітні фрукти та овочі, такі як яблука, апельсини, груші, моркву, полуниці, ананаси та багато інших. Ми прагнемо зберегти природний смак і корисні властивості кожного інгредієнта, тому не додаємо жодних штучних барвників, консервантів або солодких добавок. Наша мета - надати вам свіжі, смачні та живильні соки, які приносять радість і сприяють вашому здоров'ю",
            active: false
        },
    ];

    const setActiveQuestion = (id: number) => {
        const questions = faqQuestions?.map(item => {
            if(id === item.id) {
                return (
                    {...item, active: !item.active}
                )
            } else {
                return (
                    {...item, active: false}
                )
            }
        })
        setFaqQuestions(questions)
    }

    useEffect(() => {
        const getQuestions = async () => {
            try {
                //request
                setFaqQuestions(questions);
            } catch (error) {
                console.log(error);
            }
        }
        getQuestions();
    }, [])

    return (
        <section className="faq">
            <div className="container">
                <h2 className="faq__title">Питання які нам часто задають</h2>
                <ul className="faq__questions">
                    {faqQuestions && (
                        faqQuestions.map(item => (
                            <li 
                                key={item.id} 
                                className={item.active ? 'faq__item faq__item--active' : 'faq__item'}
                                onClick={() => setActiveQuestion(item.id)}
                            >
                                <div className="faq__question">
                                    <h3 className={item.active ? 'faq__heading faq__heading--active' : 'faq__heading'}>{item.question}</h3>
                                    <img 
                                        src={arrow}
                                        alt='Відкрити'
                                        className={item.active ? 'faq__arrow faq__arrow--active' : 'faq__arrow'} 
                                    />
                                </div>
                                <p className={item.active ? 'faq__answer faq__answer--active' : 'faq__answer'}>{item.answer}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </section>
    )
}

export default Faq;