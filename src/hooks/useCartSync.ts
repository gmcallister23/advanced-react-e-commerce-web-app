import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToCart } from '../api/cartApi';
import { setCart } from '../cart/cartSlice';

export const useCartSync = (userId?: string) => {

    console.log('SYNC USER', userId);
    const dispatch = useDispatch();
    const unsubRef = useRef<null | (() => void)>(null);

    useEffect(() => {
    
    console.log('Attach');

    unsubRef.current?.();
    unsubRef.current = null;

        if (!userId) {
            return () => {};
        }    
    console.log("LISTENER ATTACHING");

    unsubRef.current = subscribeToCart(userId, (items) => {
    console.log("SNAPSHOT FIRED:", items)
    dispatch(setCart(items));
    })
    return () => {
        console.log('DETACH');
        unsubRef.current?.();
        unsubRef.current = null;
    }
    }, [userId, dispatch]);
}