import type { Order } from '../types/order'

type Props = {
    order: Order;
};

const OrderDetails = ({ order }: Props) => {

    console.log('RENDER ORDER', order);

    return (
        <div>
            <h2>Order #{order.orderId}</h2>

            {order.items.map(item => (
                <div key={item.productId}>
                    {/*{item.image && (
                    <img src={item.image} />
                    )} */}
                    <h3>{item.title}</h3>
                    {/*{item.description && (
                    <p>{item.description}</p>
                    )} */}
                    <p>Qty: {item.quantity}</p>
                    <p>${item.price}</p>
                </div>    
            
            ))}
            <h3>Order Total: {order.total}</h3>
        </div>

        

       
    )

}

export default OrderDetails;

  
        
        {/* 
        <h1>TEST</h1>
            <p>{order.orderId}</p>
            <p>Total: ${order.total}</p>
            <p>Items: {order.items?.length}</p>
            {order.items?.map(item => {
                console.log('ITEM', item);
                
                return(
                <div key={item.productId}>
                    <p>{item.title}</p>
                    {item.description && (
                        <p>{item.description}</p>
                    )}
                    
                </div>
                )
            })}
        */}