import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductDetail } from '../types/types';

type recentlyViewed = {
    recentlyViewed: IProductDetail[]
}

const tempRecentViews = localStorage.getItem('recentlyViewed');
const recentlyViewedState = tempRecentViews ? JSON.parse(tempRecentViews) : [];

const initialState: recentlyViewed = {
    recentlyViewed: recentlyViewedState
}

const recentlyViewedSlice = createSlice({
    name: 'recentlyViewed',
    initialState,
    reducers: {
        addTorecentlyViewed : (state, action: PayloadAction<IProductDetail>) => {
            const isRecently = state.recentlyViewed.find(item => item.id === Number(action.payload.id));

            if(!isRecently) {
                state.recentlyViewed.unshift({
                    id: action.payload.id,
                    title: action.payload.title,
                    images: action.payload.images,
                    price: action.payload.price,
                    minQuanityOrder: action.payload.minQuanityOrder,
                    availability: action.payload.availability,
                    description: action.payload.description,
                    characteristics: action.payload.characteristics,
                    promo: action.payload.promo
                })
                if(state.recentlyViewed.length >= 12) {
                    state.recentlyViewed.pop();
                }
                localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
            }
        }
    }
})

export const { addTorecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;