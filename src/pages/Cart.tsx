import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import CartItemComponent from '../components/CartItem';

const Cart = () => {
    //const items = useSelector((state: RootState) => state.cart.items);
    //const totalQuantity = useSelector (
        //(state: RootState) => state.cart.totalQuantity
   // );
    //return (
       {/* 
        <div>
            <h2>Cart ({totalQuantity})</h2>
            {items.map(item => (
                <CartItemComponent key={item.id} item={item} />
            ))}
        </div>
        */} 
    //)

    //const items = useSelector((state: RootState) => {
       // console.log("CART STATE:", state.cart.items);
        //return state.cart.items;
    //});
    const items = useSelector((state: RootState) => state.cart.items);
    console.log("CART RENDER:", items);

    return (
        <div>
            <h2>Cart</h2>
            <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
    );

};

export default Cart;