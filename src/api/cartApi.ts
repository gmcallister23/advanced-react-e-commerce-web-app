import type { CartItem } from "../types/types";
import { addDoc, collection, getDoc, getDocs, where, query, deleteDoc, doc, updateDoc, increment, setDoc, onSnapshot, serverTimestamp} from "firebase/firestore";
import { db } from '../lib/firebaseConfig';

let activeUnsub: null | (() => void) = null;

export const subscribeToCart = (
    userId: string, callback: (items: CartItem[]) => void
) => {

    //kill previous listener before starting a new one
    if (activeUnsub) {
        activeUnsub();
        activeUnsub = null;

    }
    const unsub =  onSnapshot(
        collection(db, 'carts', userId, 'items'),
        (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                productId: doc.id,
                ...doc.data(),
            })) as CartItem[];
            
            callback(items);

        }
    );

    activeUnsub = unsub;

    return unsub;

}

export const addItem = async (
    userId: string,
    item: CartItem
) => {
    const itemRef = doc(db, 'carts', userId, 'items', item.productId);

    const snapshot = await getDoc(itemRef)
    
    if (snapshot.exists()) {
        await updateDoc(itemRef, {
            quantity: increment(1),
        });
    } else {
        await setDoc(itemRef, {
            productId: item.productId,
            title: item.title,
            price: item.price,
            image: item.image ?? '',
            description: item.description ?? '',
            quantity: 1,
        });
    };
};

export const removeItem = async (userId: string, productId: string) => {
    await deleteDoc(doc(db, 'carts', userId, 'items', productId));
};

export const incrementQuantity = async (userId: string, productId: string) => {
    
    const itemRef = doc(db, 'carts', userId, 'items', productId)
    
    await updateDoc(itemRef, {
        quantity: increment(1),
    });
};

export const decrementQuantity = async (userId: string, productId: string) => {
    
    const itemRef = doc(db, 'carts', userId, 'items', productId);
    const snapshot = await getDoc(itemRef)

    if(!snapshot.exists()) return;

    const currentQuantity = snapshot.data().quantity;
    
    if (currentQuantity <= 1) {
        await deleteDoc(itemRef);
    } else {
        await updateDoc(itemRef, {
            quantity: increment(-1),
        });
    }
}

export const clearUserCart = async (userId: string) => {
    const q = query(collection(db, 'carts', userId, 'items'));
    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
}

// export const createOrder = async (orderData: {
//     userId: string;
//     items: {
//         productId: string,
//         title: string,
//         price: number;
//         quantity: number;
//     } [],
//     total: number;
// }) => {
//     try{
//         const orderRef = await addDoc(collection(db, 'orders'), {
//             userId: orderData.userId,
//             items: orderData.items,
//             total: orderData.total,
//             status: 'pending',
//             createdAt: serverTimestamp(),
//         })

//         return orderRef.id;
//     } catch (error) {
//         console.error('Error creating order: ', error)
//         throw error;
//     }
// }

//export default { addItem, removeItem, incrementQuantity, decrementQuantity};