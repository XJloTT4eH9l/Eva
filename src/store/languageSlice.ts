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
            "code": "ua",
            "title": "Ukraine"
        },
        {
            "id": 2,
            "code": "en",
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
        }
    }
})

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;