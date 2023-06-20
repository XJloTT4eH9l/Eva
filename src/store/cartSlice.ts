import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/types';

type cartState = {
    cartItems: ICartItem[];
    orderDone: boolean;
}

interface input {
    id: number;
    value: number;
    size: number
}

interface IProductAdded {
    id: number;
    size: number;
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
                barcode: action.payload.barcode,
                size: action.payload.size
            })
            state.orderDone = false;
            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        onClickPlus : (state, action: PayloadAction<IProductAdded>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);

            if(item && item.quanity < 9999) {
                item.quanity++;
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        onClickMinus : (state, action: PayloadAction<IProductAdded>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);

            if(item) {
                item.quanity--;
                if(item.quanity < item.minQuanityOrder) {
                    state.cartItems = state.cartItems.filter(cartItem => cartItem !== item);
                }
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        onQuantityChange: (state, action:PayloadAction<input>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);
            
            if(item) {
                item.quanity = action.payload.value;
            }

            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        removeItem : (state, action: PayloadAction<IProductAdded>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);
            
            if(item) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem !== item);
                localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
            }
        },
        clearCart : (state) => {
            state.cartItems = [];
            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        setCart : (state, action: PayloadAction<ICartItem[]>) => {
            state.cartItems = action.payload;
            localStorage.setItem('cartProducts', JSON.stringify(state.cartItems));
        },
        setOrderDone : (state) => {
            state.orderDone = true;
        }
    }
})

export const { addToCart, onClickPlus, onClickMinus, onQuantityChange, removeItem, clearCart, setCart, setOrderDone } = cartSlice.actions;

export default cartSlice.reducer;