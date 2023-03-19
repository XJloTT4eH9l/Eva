import Slider from "react-slick";
import heroBg from '../../assets/img/hero-bg.jpg';
import heroBg2 from '../../assets/img/hero-bg2.jpg';
import heroBg3 from '../../assets/img/hero-bg3.jpg';
import './Hero.scss';

const Hero = () => {
    const slides = [
        {id: 1, title: 'Eva ТОВ "Вітамін2015"', text: 'Натуральні соки для дорослих та дітей', img: heroBg},
        {id: 2, title: 'Eva', text: 'Натуральні соки', img: heroBg2},
        {id: 3, title: 'Eva ТОВ ', text: 'Для дорослих та дітей', img: heroBg3}
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
        arrows: false
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
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default Hero;