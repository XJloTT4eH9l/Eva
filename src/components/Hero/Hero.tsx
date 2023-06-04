import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Slider from "react-slick";
import heroBg from '../../assets/img/hero-bg.jpg';
import heroBg2 from '../../assets/img/hero-bg2.jpg';
import heroBg3 from '../../assets/img/hero-bg3.jpg';
import './Hero.scss';

const Hero:FC = () => {
    const { t } = useTranslation();
    const slides = [
        {id: 1, title: 'Eva', text: 'Натуральні соки для дорослих та дітей', img: heroBg},
        {id: 2, title: 'Eva', text: 'Натуральні соки', img: heroBg2},
        {id: 3, title: 'Eva', text: 'Для дорослих та дітей', img: heroBg3}
    ];
    const sliderSettings = {
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear",
        dots: true,
        waitForAnimate: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: false
                }
              },
        ]
    }
    return (
        <section className="hero">
            <Slider {...sliderSettings}>
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div className="hero__slide" style={{backgroundImage: `url(${slide.img})`}}>
                            <div className="container">
                                <h1 className='hero__title'>{slide.title}</h1>
                                <p className='hero__text'>{slide.text}</p>
                                <Link className='hero__link' to='/'>{t("proposition.detail")}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default Hero;

const NextArrow:FC = (props: any) => {
    const { className, style, onClick } = props; 
    return (
        <div 
            className={className}
            style={{...style, display:'block'}}
            onClick={onClick}
        >
            ›
        </div>
    )
}

const PrevArrow:FC = (props: any) => {
    const { className, style, onClick } = props; 
    return (
        <div 
            className={className}
            style={{...style, display:'block'}}
            onClick={onClick}
        >
            ‹
        </div>
    )
}