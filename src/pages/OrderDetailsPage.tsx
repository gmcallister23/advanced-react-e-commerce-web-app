import OrderDetails from "../components/OrderDetails";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderById } from "../api/orderApi";
import type { Order } from "../types/order";

const OrderDetailsPage = () => {
    const { orderId } = useParams();

    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) return;

            const data = await getOrderById(orderId);
            setOrder(data);
        };

        fetchOrder();
    }, [orderId]);

    if (!order) return <p>Loading...</p>;

    return <OrderDetails order={order}/>;
};

export default OrderDetailsPage;