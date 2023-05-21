import { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { IPhoto } from '../../types/types';

import close from '../../assets/img/close.png';
import arrow from '../../assets/img/arrow.svg';

import './Gallery.scss';

interface GalleryProps {
    title: string
    photos: IPhoto[];
}

const Gallery:FC<GalleryProps> = ({ title, photos }) => {
    const { t } = useTranslation();
    const [imgNumber, setImgNumber] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const innerWidth = window.innerWidth;
    const [ref, inView] = useInView({threshold: innerWidth < 900 ? 0.1 : 0.3, triggerOnce: true});

    const handleOpenModal = (index: number) => {
        document.body.style.overflow = 'hidden';
        setImgNumber(index);
        setModalOpen(true);
      }

      const handleCloseModal = () => {
        document.body.style.overflow = 'visible';
        setModalOpen(false);
      }
    
      const prevSlide = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        imgNumber === 0 
        ? setImgNumber( photos.length -1 ) 
        : setImgNumber( imgNumber - 1 )
      }
     
      const nextSlide = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        imgNumber + 1 === photos.length 
        ? setImgNumber(0) 
        : setImgNumber(imgNumber + 1)
      }

    return (
        <section className='gallery' ref={ref}>
            <div className="container">
                <h2 className={inView ? 'gallery__title gallery__title--active' : 'gallery__title'}>{title}</h2>
                
                <ul className={inView ? 'gallery__list gallery__list--active' : 'gallery__list'}>
                    {photos.filter((_, i) => i < 6).map((photo, i) => (
                        <li className='gallery__photo' key={photo.id} onClick={() => handleOpenModal(i)}>
                            <img className='gallery__img' src={photo.img} alt=''/>
                        </li>
                    ))}
                </ul>

                {modalOpen && 
                    <div className='gallery__modal' onClick={handleCloseModal}>
                        <button className='gallery__close gallery__btn' onClick={handleCloseModal}>
                            <img src={close} alt='close' />
                        </button>
                        <button className='gallery__prev gallery__btn' onClick={prevSlide}>
                            <img src={arrow} alt='previous' />
                        </button>
                        <button className='gallery__next gallery__btn' onClick={nextSlide}>
                            <img src={arrow} alt='next' />
                        </button>
                        <div className='gallery__count'>{imgNumber + 1} of {photos.length}</div>
                        <div className='gallery__full-img'>
                            <img src={photos[imgNumber].img} alt='' />
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Gallery;