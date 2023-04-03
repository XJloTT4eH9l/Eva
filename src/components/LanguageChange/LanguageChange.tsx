import { FC } from 'react';
import './LanguageChange.scss';

interface LanguageChangeProps {
    type?: string;
    setMobileMenuOpen: (open: boolean) => void;
}

const LanguageChange:FC<LanguageChangeProps> = ({ type, setMobileMenuOpen }) => {
    const languages = [
        {id: 1, language: 'Ua'},
        {id: 2, language: 'Eng'}
    ];
    return (
        <div className={type === 'mobileChange' ?  "language language--mobile" : 'language'}>
            {languages.map(item => (
                <p key={item.id} className="language__item" onClick={() => setMobileMenuOpen(false)}>{item.language}</p>
            ))}
        </div>
    )
}

export default LanguageChange;