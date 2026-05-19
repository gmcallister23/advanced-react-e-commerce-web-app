export type OrderItem = {
    productId: string,
    title: string,
    price: number,
    quantity: number,
}

export type Order = {
    orderId: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: string;
}