import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

import Greeting from '../../components/Greeting/Greeting';
import VideoBlock from '../../components/VideoBlock/VideoBlock';
import AboutBlock from '../../components/AboutBlock/AboutBlock';
import Benefits from '../../components/Benefits/Benefits';
import Gallery from '../../components/Gallery/Gallery';
import Faq from '../../components/Faq/Faq';

import gallery1 from '../../assets/img/gallery-1.jpg';
import gallery2 from '../../assets/img/gallery-2.jpg';
import gallery3 from '../../assets/img/gallery-3.jpg';
import gallery4 from '../../assets/img/gallery-4.jpg';
import gallery5 from '../../assets/img/gallery-5.jpg';
import gallery6 from '../../assets/img/gallery-6.jpg';
import video from '../../assets/video/apples.mp4';

import './AboutPage.scss';

const AboutPage:FC = () => {
    const { t } = useTranslation();
    const photos = [
        {id: 1, img: gallery1},
        {id: 2, img: gallery2},
        {id: 3, img: gallery3},
        {id: 4, img: gallery4},
        {id: 5, img: gallery5},
        {id: 6, img: gallery6},
        {id: 7, img: gallery1},
        {id: 8, img: gallery2},
    ];

    // const about = [
    //     {
    //         id: 1,
    //         title: 'Наша продукція',
    //         text: ['- це корисний продукт,який полюбився вітчизняному споживачеві завдяки рівню обробки фруктів, який дозволяє зберегти в напої всі корисні вітаміни та мікроелементи. Ми виробляємо і постачаємо широкий асортимент різноманітних фруктово-ягідних соків (також і концентрованих) власного виробництва за вигідною ціною.', 
    //         '- першокласні натуральні соки і сиропи, ідеальні для дорослих і дітей. Вони зроблені на високотехнологічному обладнанні і відповідають всім вимогам Держстандарту. Щоб бути здоровим, в раціоні обов"язково повинен бути присутній сік, складові якого - це тільки натуральні компоненти, фрукти і ягоди.В даний час на ринку є достатньо різноманітні пропозиції: соки, нектари, сиропи, напої і вони користуються попитом.'],
    //         img: 'https://static.toiimg.com/thumb/75122042.cms?width=680&height=512&imgsize=279881'
    //     },
    //     {
    //         id: 2,
    //         title: 'Купити соки',
    //         text: ['В даний час на ринку є достатньо різноманітні пропозиції: соки, нектари, сиропи, напої і вони користуються попитом. Це не дивно, адже існує безліч аргументів на користь натурального напою: соки багаті на вітаміни, нестача яких особливо гостро може відчуватися в зимовий період;',
    //         'Завдяки високому вмісту в них таких речовини, як фолієва кислота, вони надають благотворний ефект на зростання кісткової тканини; здатні підтримувати оптимальний рівень цукру в крові.Реалізовані нами фруктові сиропи являють собою суміш соку з високим вмістом цукру.'],
    //         img: 'https://static.toiimg.com/thumb/75122045.cms?width=680&height=512&imgsize=180828'
    //     },
    //     {
    //         id: 3,
    //         title: 'Купити соки',
    //         text: ['Купити соки оптом від виробника «Вітамін-2015» рекомендуємо всім, хто зацікавлений в висококласному продукті за прийнятною вартістю. У нас вам вдасться замовити:',
    //         'фруктово-ягідні соки',
    //         'концентровані соки',
    //         'зброджений сік',
    //         'фруктово-ягідні сиропи',
    //         'концентровані чаї'
    //         ],
    //         link: {href: '/categories', title: 'До категорій'},
    //         img: 'https://static.toiimg.com/thumb/75122039.cms?width=680&height=512&imgsize=256941'
    //     },
    //     {
    //         id: 4,
    //         title: 'Наші соки',
    //         text: [
    //             'Виробники фруктових соків сьогодні привертають увагу споживачів яскравою упаковкою і формою, але ми знаємо, що не завжди ефектний зовнішній вигляд прирівнюється до користі, тому рекомендуємо завжди уважно читати етикетки.',
    //             'Натуральні соки, які ми пропонуємо придбати, з"являться на полицях вашого магазину миттєво, якщо скористатися можливостями даного сайту і заповнити заявку на придбання.',
    //             'Ви залишитеся задоволені розвитком Вашого бізнесу.',
    //             'Переконайтеся в цьому особисто!'
    //         ], 
    //         img: 'https://static.toiimg.com/thumb/75122037.cms?width=680&height=512&imgsize=131672'  
    //     }
    // ];

    // const getAboutInfo = () => {
    //     // request
    //     setAboutInfo(about);
    // } 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className='about-page'>
            <Greeting />
            <VideoBlock title={t("about_page.about_company")} video={video} />
            <AboutBlock />
            <Benefits />
            <Gallery photos={photos} />
            <Faq />
        </div>
    )
}

export default AboutPage;