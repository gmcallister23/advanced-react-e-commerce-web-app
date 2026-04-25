import type { CartItem } from '../types/types'

type Props = {
    item: CartItem;
};

const CartItem = ({item}: Props) => {
    return (
        <div>
            <img>{item.image}</img>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <p>Qty: {item.quantity}</p>
        </div>
    )
}