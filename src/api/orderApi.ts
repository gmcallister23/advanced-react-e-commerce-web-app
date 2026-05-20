import { addDoc, collection, serverTimestamp, where, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../lib/firebaseConfig';
import type { Order } from '../types/order';

export const createOrder = async (orderData: {
    userId: string;
    items: {
        productId: string,
        title: string,
        price: number;
        quantity: number;
    } [],
    total: number;
}) => {
    try{
        const orderRef = await addDoc(collection(db, 'orders'), {
            userId: orderData.userId,
            items: orderData.items,
            total: orderData.total,
            status: 'pending',
            createdAt: serverTimestamp(),
        })

        return orderRef.id;
    } catch (error) {
        console.error('Error creating order: ', error)
        throw error;
    }
}

export const getUserOrders = async (userId: string): Promise<Order[]> => {
    const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
    )

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        orderId: doc.id,
        ...doc.data(),
    })) as Order [];
}

export const getOrderById = async (orderId: string) => {
    const docRef = doc(db, 'orders', orderId);

    const snapshot = await getDoc(docRef);

    if(!snapshot.exists()) {
        throw new Error('Order not found');
    }

    const data = snapshot.data();

    return{
        orderId: snapshot.id,
        userId: data.userId,
        
        total: data.total,
        status: data.status,
        createdAt: data.createdAt,
        
        items: Array.isArray(data.items) ?
            data.items.map((item: any) => ({
                productId:item.productId,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                //guarantees consistency for ALL orders
                image: item.image ?? '',
                description: item.description ?? '',
            })) : [],
        //...snapshot.data()
    }
}