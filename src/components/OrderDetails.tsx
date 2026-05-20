import type { Order } from '../types/order'

type Props = {
    order: Order;
};

const OrderDetails = ({ order }: Props) => {

    return (
        <div>
            <h2>Order #{order.orderId}</h2>

            {order.items.map(item => (
                <div key={item.productId}>
                    <img src={item.image} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>${item.price}</p>
                </div>    
            
            ))}
            <h3>Order Total: {order.total}</h3>
        </div>
    )

}

export default OrderDetails;