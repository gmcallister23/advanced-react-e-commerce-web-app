import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types/types';

interface CartState {
    items: CartItem[],
    totalQuantity: number,
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;

            const existingItem = state.items.find(item => item.id === newItem.id)

            state.totalQuantity ++;

            if(!existingItem) {
                state.items.push({ ...newItem, quantity: 1})
            } else {
                existingItem.quantity++;
            }
        }
        
    }
})

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;