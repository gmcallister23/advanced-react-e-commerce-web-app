import type { Timestamp } from "firebase/firestore";

export type OrderItem = {
    productId: string,
    title: string,
    description: string,
    image: string,
    price: number,
    quantity: number,
}

export type Order = {
    orderId: string;
    userId: string;
    items: OrderItem[];
    description: string;
    image: string;
    total: number;
    status: string;
    createdAt: Timestamp;
}