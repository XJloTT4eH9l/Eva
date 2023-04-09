import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import './ContactPage.scss';

interface ContactObj {
    name: string;
    info: string[];
}

interface telNumbers {
    presentationNum: string;
    actualNum: string
}

interface telephoneInfo {
    name: string;
    telephoneNumber: telNumbers[];
}

interface scheduleInfo {
    name: string;
    time: string;
}

interface ContactInfo {
    titleCompany: ContactObj;
    addres: ContactObj;
    telephone: telephoneInfo;
    email: ContactObj;
    schedule: scheduleInfo;
    location: string;
}

const ContactPage = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo>();
    const [loading, setLoading] = useState<boolean>();
    
    const infoData = {
        titleCompany: {name: 'Назва компанії', info: ['ТОВ "Вітамін2015"']},
        addres: {name: 'Адреса', info: ['с. Лепесівка , вул. Залізнодорожна 14, Хмельницька обл.']},
        telephone: {
            name: 'Телефон',
            telephoneNumber: [
                {presentationNum: '+38 (096) 198-98-06', actualNum: '+380961989806'},
                {presentationNum: '+38 (096) 085-39-34', actualNum: '+380960853934'},
                {presentationNum: '+38 (068) 626-32-26', actualNum: '+380686263226'},
                {presentationNum: '+38 (067) 199-01-09', actualNum: '+380671990109'}
            ]
        },
        email: {name: 'Email', info: ['vitamin.rsv@gmail.com']},
        schedule: {name: 'Графік роботи', time: 'Пн - Пт 09:00 - 18:00; Сб, Нд - Вихідні'},
        location: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2547.3825111721117!2d26.879228015542644!3d50.322114504485064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDE5JzE5LjYiTiAyNsKwNTInNTMuMSJF!5e0!3m2!1sru!2sua!4v1681031957258!5m2!1sru!2sua'
    }

    useEffect(() => {
        const getContactInfo = async () => {
            //request
            try {
                setLoading(true);
                setContactInfo(infoData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getContactInfo();
    }, [])
    return (
        <section className="contact-page">
            <div className="container">
            <div className="bread-crumbs">
                <Link className='bread-crumbs__item' to='/'>Головна</Link>
                <span className='bread-crumbs__item'>Категорії</span>
            </div>
                <h1 className="title">Контакти</h1>
                <div className="contact-page__inner">
                    {loading ? <Spinner /> : (
                        <div className="contact-page__content">
                            <div className="contact-page__info">
                                <div className='contact-page__top-info'>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{contactInfo?.titleCompany.name}</h2>
                                        <ul className='contact-page__list'>
                                            {contactInfo?.titleCompany.info.map(item => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="contact-page__item">
                                        <h2 className='contact-page__title'>{contactInfo?.addres.name}</h2>
                                        <ul className='contact-page__list'>
                                            {contactInfo?.addres.info.map(item => (
                                                <li key={item}>
                                                    <a target='_blank' rel="noreferrer" className='contact-page__link' href={`href:${item}`}>
                                                        <svg className='contact-page__icon'><use href='#location'></use></svg>
                                                        <span>{item}</span>
                                                    </a>
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
                                <h2 className='contact-page__title contact-page__title--location'>Місцезнаходження</h2>
                            <iframe 
                                src={contactInfo?.location}
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
    )
}

export default ContactPage;