import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LangType {
    id: number;
    code: string;
    title: string;
}

interface LangState {
    langs: LangType[];
    curentLang: LangType;
}

const initialState: LangState = {
    langs: [
        {
            "id": 1,
            "code": "UA",
            "title": "Ukraine"
        },
        {
            "id": 2,
            "code": "EN",
            "title": "England"
        }
    ],
    curentLang: {
        "id": 1,
        "code": "ua",
        "title": "Ukraine"
    },
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<LangType>) => {
            state.curentLang = action.payload;
        },
        setAllLanguages: (state, action: PayloadAction<LangType[]>) => {
            state.langs = action.payload;
        }
    }
})

export const { setLanguage, setAllLanguages } = languageSlice.actions;

export default languageSlice.reducer;