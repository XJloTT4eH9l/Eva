import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Svg from '../Svg/Svg';
import './Footer.scss';

const Footer:FC = () => {
    return (
        <>
            <Svg />
            <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className='footer__logo footer__logo--top'>
                        <Logo type='footer' />
                    </div>
                    <div className="footer__column">
                        <h4 className='footer__title'>Інформація</h4>
                        <ul className="footer__list">
                            <li className='footer__item'><NavLink className='footer__link' to='/'>Головна</NavLink></li>
                            <li className='footer__item'><NavLink className='footer__link' to='/categories'>Категорії</NavLink></li>
                            <li className='footer__item'><NavLink className='footer__link' to='/about'>Про нас</NavLink></li>
                            <li className='footer__item'><NavLink className='footer__link' to='/contacts'>Контакти</NavLink></li>
                        </ul>
                    </div>
                    <div className='footer__logo footer__logo--center'>
                        <Logo type='footer' />
                    </div>
                    <div className="footer__column">
                        <h4 className='footer__title'>Контакти</h4>
                        <ul className="footer__list footer__list--contacts">
                            <li className='footer__item'>
                                <a className='footer__link footer__link--contact' href='tel:+380961989806'>
                                    <svg className='footer__icon'><use href='#phone'></use></svg>
                                    <span>+38 (096) 198-98-06</span>
                                </a>
                            </li>
                            <li className='footer__item'>
                                <a className='footer__link footer__link--contact' href='tel:+380960853934'>
                                    <svg className='footer__icon'><use href='#phone'></use></svg>
                                    <span>+38 (096) 085-39-34</span>
                                </a>
                            </li>
                            {/* <li className='footer__item'>
                                <a className='footer__link footer__link--contact' href='tel:+380686263226'>
                                    <svg className='footer__icon'><use href='#phone'></use></svg>
                                    <span>+38 (068) 626-32-26</span>
                                </a>
                            </li>
                            <li className='footer__item'>
                                <a className='footer__link footer__link--contact' href='tel:+380671990109'>
                                    <svg className='footer__icon'><use href='#phone'></use></svg>
                                    <span>+38 (067) 199-01-09</span>
                                </a>
                            </li> */}
                            <li className='footer__item'>
                                <a className='footer__link footer__link--contact' rel="noreferrer" href='mailto:vitamin.rsv@gmail.com' target='_blank'>
                                    <svg className='footer__icon'><use href='#mail'></use></svg>
                                    <span>vitamin.rsv@gmail.com</span>
                                </a>
                            </li>
                            <li className='footer__item'>
                                <a className='footer__link footer__link--contact' rel="noreferrer" target='_blank' href='https://www.google.com.ua/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9F%D1%80%D0%B8%D0%B2%D0%BE%D0%BA%D0%B7%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0,+9,+%D0%A1%D0%BB%D0%B0%D0%B2%D1%83%D1%82%D0%B0,+%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+30000/@50.3217187,26.8814254,3a,75y,26.87h,73.64t/data=!3m7!1e1!3m5!1sLeOzRRrK992lsz-S4v6ZpA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DLeOzRRrK992lsz-S4v6ZpA%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D29.136036%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656!4m6!3m5!1s0x472ef0e70105849f:0xe5a259c5b6a5e73f!8m2!3d50.3219069!4d26.8815736!16s%2Fg%2F11c5n7mjdp?hl=ru'>
                                    <svg className='footer__icon'><use href='#location'></use></svg>
                                    <span>Хмельницька область, вулиця Привокзальна 9</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </footer>
        </>
    )
}

export default Footer;