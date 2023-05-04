import { FC } from 'react';

import Greeting from '../../components/Greeting/Greeting';
import AboutBlock from '../../components/AboutBlock/AboutBlock';

import './MainPage.scss';

const MainPage:FC = () => {
    return (
        <div className='main-page'>
            <Greeting />
            <AboutBlock />
        </div>
    )
}

export default MainPage;