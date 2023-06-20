import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/reduxHooks';
import { API_TRANSLATIONS } from '../../constants/api';
import { ContactType } from '../../types/types';
import Seo from '../../components/Seo/Seo';
import Spinner from '../../components/Spinner/Spinner';
import './ContactPage.scss';

const ContactPage = () => {
    const currentLanguage = useAppSelector(state => state.languages.curentLang);
    const [contactInfo, setContactInfo] = useState<ContactType>();
    const [loading, setLoading] = useState<boolean>();
    const { t } = useTranslation(); 

    const getContactInfo = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_TRANSLATIONS + currentLanguage.id);
            setContactInfo(res.data[0].data.contact_page);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getContactInfo();
    }, [])

    useEffect(() => {
        getContactInfo();
    }, [currentLanguage])

    return (
        <>
            <Seo
                title={currentLanguage.id === 1 ? 'Eva | Контакти' : 'Eva | Contacts'}
                description={
                    currentLanguage.id === 1 
                        ? 'Наша компанія Eva знаходиться за адресою: с. Лепесівка, вул. Залізнодорожна 14, Хмельницька обл.. Працюємо Пн - Пт 09:00 - 18:00; Сб, Нд - Вихідні' 
                        : 'Our company Eva is located at the address: Lepesivka, str. Zaliznodorozhna 14, Khmelnytska region. We work Mon - Fri 09:00 - 18:00; Sat, Sun - Weekend'
                } 
            />
            <section className="contact-page">
            <div className="container">
            <div className="bread-crumbs">
                <Link className='bread-crumbs__item' to='/home'>{t("nav.main")}</Link>
                <span className='bread-crumbs__item'>{t("nav.contacts")}</span>
            </div>
                <h1 className="title">{t("nav.contacts")}</h1>
                <div className="contact-page__inner">
                    {loading ? <Spinner /> : (
                        <div className="contact-page__content">
                            <div className="contact-page__info">
                                <div className='contact-page__top-info'>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{contactInfo?.titleCompany.name}</h2>
                                        <p>{contactInfo?.titleCompany.info}</p>
                                    </div>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{t("contact_page.address.name")}</h2>
                                        <ul className='contact-page__list'>
                                            {contactInfo?.address.info.map(item => (
                                                <li key={item}>
                                                    <p className='contact-page__link'>
                                                        <svg className='contact-page__icon'><use href='#location'></use></svg>
                                                        <span>{item}</span>
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{contactInfo?.schedule.name}</h2>
                                        <p>{contactInfo?.schedule.time}</p>
                                    </div>
                                </div>
                                <div className='contact-page__bottom-info'>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{contactInfo?.email.name}</h2>
                                        <ul className='contact-page__list'>
                                            {contactInfo?.email.info.map(item => (
                                                <li key={item}>
                                                    <a className='contact-page__link' href={`mailto:${item}`}>
                                                        <svg className='contact-page__icon'><use href='#mail'></use></svg>
                                                        <span>{item}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{contactInfo?.telephone.name}</h2>
                                        <ul className='contact-page__list'>
                                            {contactInfo?.telephone.telephoneNumber.map(item => (
                                                <li key={item.actualNum}>
                                                    <a className='contact-page__link' href={`tel:${item.actualNum}`}>
                                                        <svg className='contact-page__icon'><use href='#phone'></use></svg>
                                                        <span>{item.presentationNum}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-page__map">
                                <h2 className='contact-page__title contact-page__title--location'>{contactInfo?.location.name}</h2>
                            <iframe 
                                src={contactInfo?.location.googleMap}
                                title='Eva location'
                                className='location' 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    )
}

export default ContactPage;