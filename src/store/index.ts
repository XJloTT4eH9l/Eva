import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import recentlyViewedReducer from './recentViewSlice';
import languageReducer from './languageSlice';

const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    recentlyViewed: recentlyViewedReducer,
    languages: languageReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;