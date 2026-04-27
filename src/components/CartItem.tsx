import type { CartItem } from '../types/types'

type Props = {
    item: CartItem;
};

const CartItemComponent = ({item}: Props) => {
    return (
        <div className="d-flex p-3 justify-content-around align-items-end border border-dark rounded bg-secondary-subtle">
            <img src={item.image} alt={item.title} width={50} height={50}/>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <p>Qty: {item.quantity}</p>
        </div>
    )
}

export default CartItemComponent;