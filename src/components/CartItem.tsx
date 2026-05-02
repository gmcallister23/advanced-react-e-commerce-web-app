import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../cart/cartSlice';
//import { useProductContext } from '../context/ProductContext';
import type { CartItem } from '../types/types'

type Props = {
    item: CartItem;
};

const CartItemComponent = ({item}: Props) => {
    const dispatch = useDispatch();
    //const { dispatch } = useProductContext();
    const subTotal = item.price * item.quantity;

    return (
        <div className="d-flex p-3 justify-content-around align-items-end border border-dark rounded bg-secondary-subtle">
            <img src={item.image} alt={item.title} width={50} height={50}/>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => dispatch(incrementQuantity(item.id))}> 
                + 
            </button>
            <p>Qty: {item.quantity}</p>
            <button onClick={() => dispatch(decrementQuantity(item.id))}>
                -
            </button>
            <p>{subTotal}</p>
            <button onClick={() => dispatch(removeItem(item.id))}>
                🗑️
            </button>
        </div>  
    )
}

export default CartItemComponent;