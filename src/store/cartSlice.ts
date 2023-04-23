import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/types';

type cartState = {
    cartItems: ICartItem[];
    orderDone: boolean;
}

const tempCartItems = localStorage.getItem('cartProducts');
const cartItemsState = tempCartItems ? JSON.parse(tempCartItems) : [];

const initialState: cartState = {
    cartItems: cartItemsState,
    orderDone: false
}

const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            state.cartItems.push({
                id: action.payload.id,
                title: action.payload.title,
                images: action.payload.images,
                price: action.payload.promo?.promo_price ? action.payload.promo.promo_price : action.payload.price,
                quanity: action.payload.quanity,
                minQuanityOrder: action.payload.minQuanityOrder,
                promo: action.payload.promo,
                barcode: action.payload.barcode
            })
            state.orderDone = false;
            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        onClickPlus : (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload);

            if(item) {
                item.quanity++;
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        onClickMinus : (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload);

            if(item) {
                item.quanity--;
                if(item.quanity < item.minQuanityOrder) {
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
                }
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        removeItem : (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        clearCart : (state) => {
            state.cartItems = [];
            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        setOrderDone : (state) => {
            state.orderDone = true;
        }
    }
})

export const { addToCart, onClickPlus, onClickMinus, removeItem, clearCart, setOrderDone } = cartSlice.actions;

export default cartSlice.reducer;