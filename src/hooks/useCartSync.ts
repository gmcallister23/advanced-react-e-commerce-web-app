import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToCart } from '../api/cartApi';
import { setCart } from '../cart/cartSlice';

export const useCartSync = (userId?: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
    console.log('Attach');
        if (!userId) return;

    console.log("LISTENER ATTACHING");

    const unsub = subscribeToCart(userId, (items) => {
    console.log("SNAPSHOT FIRED:", items)
    dispatch(setCart(items));
    })
    return () => {
        console.log('DETACH');
        unsub()
    }
    }, [userId, dispatch]);
}