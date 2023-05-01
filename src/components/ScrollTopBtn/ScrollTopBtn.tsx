import { useState, useEffect, FC } from 'react';
import arrow from '../../assets/img/arrow.svg';
import './ScrollTopBtn.scss';

const ScrollTopBtn:FC = () => {
    const [scroll, setScroll] = useState<number>(0);

    const handleScroll = () => {
        setScroll(window.scrollY);
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <button 
            className={scroll > 400 ? 'scroll-top scroll-top--active' : 'scroll-top'}
            onClick={scrollToTop}
        >
           <img className='scroll-top__img' src={arrow} alt='Вверх' />
        </button>
    )
}

export default ScrollTopBtn