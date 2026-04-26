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
            console.log("REDUCER HIT", action.payload);

            return {
                cart: {
                    items: [action.payload],
                    totalQuantity: 1,
                },
            };
            //state.items.push(action.payload);

            //state.totalQuantity++;
            //const newItem = action.payload;

            //const existingItem = state.items.find(item => item.id === newItem.id)

            //state.totalQuantity ++;

            //if(!existingItem) {
               // state.items.push(newItem)
            //} else {
            //    existingItem.quantity++;
            //}
        }
        
     }
})

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;