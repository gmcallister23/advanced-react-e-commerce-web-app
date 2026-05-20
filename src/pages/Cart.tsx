import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import CartItemComponent from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import CheckoutModal from '../components/modals/ConfirmPurchase';
import { useState } from 'react';
import type { CheckoutStep } from '../types/types';
import { createOrder } from '../api/orderApi';
import { useAuth } from '../context/AuthContext';
import { clearUserCart } from '../api/cartApi';
import { clearCart } from '../cart/cartSlice';
import { ProductProvider } from '../context/ProductContext';




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

    const { user } = useAuth();
    const userId = user?.uid;

    const dispatch = useDispatch();

    const handleCreateOrder = async () => {
        
        if (!userId) {
            throw new Error('User must be logged in to place an order');
        }

        await createOrder({
            userId, items: items.map(item => ({
                productId: item.productId,
                title: item.title,
                description: item.description ?? '',
                image: item.image ?? '',
                price: item.price,
                quantity: item.quantity,
            })), total,
        });

        await clearUserCart(userId);

        dispatch(clearCart());
    };

    return (
       

        <div className="bg-warning-subtle vh-100 pt-5">
            <nav >
                <NavBar />
            </nav>
            {/*<button onClick={() => navigate('/')}>Home</button> */}
            <h2 className="pt-3 ps-2">Cart ({totalQuantity} items)</h2>
            {items.map(item => (
                <CartItemComponent key={item.productId} item={item} />
            ))}
            <div className="d-flex m-1 gap-1 justify-content-center align-items-center p-3">
                
                <div className="d-flex gap-2">
                <button className="btn btn-success border border-black border-2" onClick={() => {
                    setStep("confirm");
                    setShowModal(true);
                }} >Check Out</button>

                <CheckoutModal
                showModal={showModal}
                setShowModal={setShowModal}
                step={step}
                setStep={setStep}
                onConfirm={handleCreateOrder}
                />
                </div>
                <p className="border rounded bg-white px-3 py-2 m-0">Total: ${total}</p>
            </div>
            
        </div>
       
        
        
    )
    

};

export default Cart;