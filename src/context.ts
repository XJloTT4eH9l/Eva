import { createContext } from 'react';
import { Lang } from './types/types';

interface EvaContextProps {
    languages: Lang[];
    setLanguages: (langs: Lang[]) => void;
    currentLang: Lang;
    setCurrentLang: (lang: Lang) => void;
}

export const EvaContext = createContext<EvaContextProps>({
    languages: [{id: 1, code: 'UA', title: 'Ukraine'}],
    setLanguages: () => {},
    currentLang: {id: 1, code: 'UA', title: 'Ukraine'},
    setCurrentLang: () => {}
});