import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import CartItemComponent from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const Cart = () => {
    // const items = useSelector((state: RootState) => state.cart.items);
    // const totalQuantity = useSelector (
    //     (state: RootState) => state.cart.totalQuantity
    // );
    const items = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity, 0
    );
    return (
       
        <div>
            <button onClick={() => navigate('/home')}>Home</button>
            <h2>Cart ({totalQuantity})</h2>
            {items.map(item => (
                <CartItemComponent key={item.id} item={item} />
            ))}
        </div>
        
    )
    

};

export default Cart;