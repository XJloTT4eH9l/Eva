import { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IPhoto } from '../../types/types';

import close from '../../assets/img/close.png';
import arrow from '../../assets/img/arrow.svg';

import './Gallery.scss';

interface GalleryProps {
    photos: IPhoto[];
}

const Gallery:FC<GalleryProps> = ({ photos }) => {
    const [imgNumber, setImgNumber] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [ref, inView] = useInView({threshold: 0.1, triggerOnce: true});

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
                <div className={inView ? 'gallery__inner gallery__inner--active' : 'gallery__inner'}>
                    <h2 className='gallery__title'>Галерея</h2>
                    
                    <ul className='gallery__list'>
                        {photos.map((photo, i) => (
                            <li className='gallery__photo' key={photo.id} onClick={() => handleOpenModal(i)}>
                                <img className='gallery__img' src={photo.img} alt=''/>
                            </li>
                        ))}
                    </ul>

                    {modalOpen && 
                        <div className='gallery__modal' onClick={handleCloseModal}>
                            <button className='gallery__close gallery__btn' onClick={handleCloseModal}>
                                <img src={close} alt='close'/>
                            </button>
                            <button className='gallery__prev gallery__btn' onClick={prevSlide}>
                                <img src={arrow} alt='previous'/>
                            </button>
                            <button className='gallery__next gallery__btn' onClick={nextSlide}>
                                <img src={arrow} alt='next'/>
                            </button>
                            <div className='gallery__full-img'>
                                <img src={photos[imgNumber].img} alt='' />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Gallery;