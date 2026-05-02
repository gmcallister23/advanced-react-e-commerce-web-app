import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import CartItemComponent from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CheckoutModal from '../components/modals/ConfirmPurchase';
import { useState } from 'react';
import type { CheckoutStep } from '../types/types';



const Cart = () => {
    // const items = useSelector((state: RootState) => state.cart.items);
    // const totalQuantity = useSelector (
    //     (state: RootState) => state.cart.totalQuantity
    // );
    
    const navigate = useNavigate();
    
    const items = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState<CheckoutStep>("confirm");
    const total = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
       
        <div>
            <nav>
                <NavBar />
            </nav>
            <button onClick={() => navigate('/')}>Home</button>
            <h2>Cart ({totalQuantity})</h2>
            {items.map(item => (
                <CartItemComponent key={item.id} item={item} />
            ))}

            <button onClick={() => {
                setStep("confirm");
                setShowModal(true);
            }} >Check Out</button>

            <CheckoutModal
            showModal={showModal}
            setShowModal={setShowModal}
            step={step}
            setStep={setStep}
            />
            <p>Total: ${total}</p>
        </div>
        
    )
    

};

export default Cart;