import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import recentlyViewedReducer from './recentViewSlice';

const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    recentlyViewed: recentlyViewedReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;