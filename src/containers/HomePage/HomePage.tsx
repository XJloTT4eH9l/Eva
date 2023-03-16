import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Discount from '../../components/Discount/Discount';

import './HomePage.scss';

const HomePage = () => {
    return (
        <>
            <Hero /> 
            <Categories />
            <Discount />
        </>
    )
}

export default HomePage;