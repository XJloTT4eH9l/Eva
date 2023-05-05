import { FC } from 'react';

import Greeting from '../../components/Greeting/Greeting';
import AboutBlock from '../../components/AboutBlock/AboutBlock';
import Gallery from '../../components/Gallery/Gallery';

import gallery1 from '../../assets/img/gallery-1.jpg';
import gallery2 from '../../assets/img/gallery-2.jpg';
import gallery3 from '../../assets/img/gallery-3.jpg';
import gallery4 from '../../assets/img/gallery-4.jpg';
import gallery5 from '../../assets/img/gallery-5.jpg';
import gallery6 from '../../assets/img/gallery-6.jpg';


import './MainPage.scss';

const MainPage:FC = () => {
    const photos = [
        {id: 1, img: gallery1},
        {id: 2, img: gallery2},
        {id: 3, img: gallery3},
        {id: 4, img: gallery4},
        {id: 5, img: gallery5},
        {id: 6, img: gallery6},
    ];
    return (
        <div className='main-page'>
            <Greeting />
            <AboutBlock />
            <Gallery photos={photos} />
        </div>
    )
}

export default MainPage;