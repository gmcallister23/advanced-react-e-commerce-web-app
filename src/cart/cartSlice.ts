import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types/types';

interface CartState {
    items: CartItem[],
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
    }
})

export const { } = cartSlice.actions;
export default cartSlice.reducer;