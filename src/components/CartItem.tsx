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
        <div className="d-flex align-items-center border border-dark rounded bg-primary-subtle">
            <img className="col-xs m-2" src={item.image} alt={item.title} width={50} height={50}/>
            <h3 className="col-6 d-flex justify-content-center m-2">{item.title}</h3>
            <p className="col-1 m-2 d-flex">$ {item.price}</p>
            <button className="col-xs-1 m-2 btn btn-dark btn" 
            onClick={() => dispatch(incrementQuantity(item.id))}> 
                + 
            </button>
            <p className="col-xs-1 m-2">Qty: {item.quantity}</p>
            <button className="col-xs-1 m-2 btn btn-dark btn"  onClick={() => dispatch(decrementQuantity(item.id))}>
                -
            </button>
            <p className="col-1 m-2">$ {subTotal}</p>
            <button className="col-xs-1 m-2 shadow-lg btn" onClick={() => dispatch(removeItem(item.id))}>
                🗑️
            </button>
        </div>  
    )
}

export default CartItemComponent;