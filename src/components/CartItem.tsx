import type { CartItem } from '../types/types'

type Props = {
    item: CartItem;
};

const CartItemComponent = ({item}: Props) => {
    return (
        <div>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <p>Qty: {item.quantity}</p>
        </div>
    )
}

export default CartItemComponent;