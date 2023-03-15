import { FC } from 'react';
import './BurgerIcon.scss';

interface BurgerProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (item: boolean) => void;
}

const BurgerIcon:FC<BurgerProps> = ({ mobileMenuOpen, setMobileMenuOpen}) => {
    return (
        <button 
            className={mobileMenuOpen ? 'burger burger--active' : 'burger'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
            <span className='burger__item'></span>
            <span className='burger__item'></span>
            <span className='burger__item'></span>
        </button>
    )
}

export default BurgerIcon;