import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types/types';
import { getCart, saveCart } from './cartStorage';

interface CartState {
    items: CartItem[],
    totalQuantity: number,
}

const initialState: CartState = {
    items: getCart(),
    totalQuantity: 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            
            const newItem = action.payload;

            const existingItem = state.items.find(item => item.id === newItem.id)

            if(!existingItem) {
               state.items.push(newItem)
            } else {
                existingItem.quantity++;
            };

            saveCart(state.items);
        },

        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
            };

            saveCart(state.items);
        },
        
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
            } else {
                state.items = state.items.filter(item => item.id !== action.payload);
            }

            saveCart(state.items);

        },

        removeItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            
            if (!item) return;

            state.items = state.items.filter(i => i.id !== action.payload);
        
            saveCart(state.items);

        },

        
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;

            saveCart(state.items);
            
        }

     }
})

export const { addItem, incrementQuantity, decrementQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;