import { addDoc, collection, serverTimestamp, where, query, getDocs } from "firebase/firestore";
import { db } from '../lib/firebaseConfig';

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

export const getUserOrders = async (userId: string) => {
    const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
    )

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }))
}