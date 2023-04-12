import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Faq from '../../components/Faq/Faq';
import './AboutPage.scss';

type LinkObj = {
    href: string;
    title: string;
}

interface AboutInfo {
    id: number;
    title: string;
    text: string[];
    img: string;
    link?: LinkObj;
}

const AboutPage = () => {
    const [aboutInfo, setAboutInfo] = useState<AboutInfo[]>();

    const about = [
        {
            id: 1,
            title: 'Наша продукція',
            text: ['- це корисний продукт,який полюбився вітчизняному споживачеві завдяки рівню обробки фруктів, який дозволяє зберегти в напої всі корисні вітаміни та мікроелементи. Ми виробляємо і постачаємо широкий асортимент різноманітних фруктово-ягідних соків (також і концентрованих) власного виробництва за вигідною ціною.', 
            '- першокласні натуральні соки і сиропи, ідеальні для дорослих і дітей. Вони зроблені на високотехнологічному обладнанні і відповідають всім вимогам Держстандарту. Щоб бути здоровим, в раціоні обов"язково повинен бути присутній сік, складові якого - це тільки натуральні компоненти, фрукти і ягоди.В даний час на ринку є достатньо різноманітні пропозиції: соки, нектари, сиропи, напої і вони користуються попитом.'],
            img: 'https://static.toiimg.com/thumb/75122042.cms?width=680&height=512&imgsize=279881'
        },
        {
            id: 2,
            title: 'Купити соки',
            text: ['В даний час на ринку є достатньо різноманітні пропозиції: соки, нектари, сиропи, напої і вони користуються попитом. Це не дивно, адже існує безліч аргументів на користь натурального напою: соки багаті на вітаміни, нестача яких особливо гостро може відчуватися в зимовий період;',
            'Завдяки високому вмісту в них таких речовини, як фолієва кислота, вони надають благотворний ефект на зростання кісткової тканини; здатні підтримувати оптимальний рівень цукру в крові.Реалізовані нами фруктові сиропи являють собою суміш соку з високим вмістом цукру.'],
            img: 'https://static.toiimg.com/thumb/75122045.cms?width=680&height=512&imgsize=180828'
        },
        {
            id: 3,
            title: 'Купити соки',
            text: ['Купити соки оптом від виробника «Вітамін-2015» рекомендуємо всім, хто зацікавлений в висококласному продукті за прийнятною вартістю. У нас вам вдасться замовити:',
            'фруктово-ягідні соки',
            'концентровані соки',
            'зброджений сік',
            'фруктово-ягідні сиропи',
            'концентровані чаї'
            ],
            link: {href: '/categories', title: 'До категорій'},
            img: 'https://static.toiimg.com/thumb/75122039.cms?width=680&height=512&imgsize=256941'
        },
        {
            id: 4,
            title: 'Наші соки',
            text: [
                'Виробники фруктових соків сьогодні привертають увагу споживачів яскравою упаковкою і формою, але ми знаємо, що не завжди ефектний зовнішній вигляд прирівнюється до користі, тому рекомендуємо завжди уважно читати етикетки.',
                'Натуральні соки, які ми пропонуємо придбати, з"являться на полицях вашого магазину миттєво, якщо скористатися можливостями даного сайту і заповнити заявку на придбання.',
                'Ви залишитеся задоволені розвитком Вашого бізнесу.',
                'Переконайтеся в цьому особисто!'
            ], 
            img: 'https://static.toiimg.com/thumb/75122037.cms?width=680&height=512&imgsize=131672'  
        }
    ];

    const getAboutInfo = () => {
        // request
        setAboutInfo(about);
    } 

    useEffect(() => {
        window.scrollTo(0, 0);
        getAboutInfo()
    }, [])
    
    return (
        <section className="about-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/'>Головна</Link>
                    <span className='bread-crumbs__item'>Про нас</span>
                </div>
                <h1 className='title'>Про компанію</h1>
                <div className="about-page__inner">
                   {aboutInfo?.map(item => (
                        <article key={item.id} className='about-page__item'>
                            <img className='about-page__img' src={item.img} alt={item.title} />
                            <div className='about-page__content'>
                                <h2 className='about-page__title'>{item.title}</h2>
                                <div className='about-page__text'>{item.text.map(decr => (<p key={decr}>{decr}</p>))}</div>
                                {item.link && (
                                    <Link className='about-page__link' to={item.link.href}>{item.link.title}</Link>
                                )}
                            </div>
                        </article>
                   ))}
                </div>
                <Faq />
            </div>
        </section>
    )
}

export default AboutPage;