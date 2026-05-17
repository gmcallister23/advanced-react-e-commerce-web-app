import type { CartItem } from "../types/types";
import { addDoc, collection, getDoc, deleteDoc, doc, updateDoc, increment, setDoc } from "firebase/firestore";
import { db } from '../lib/firebaseConfig';


const addItem = async (
    userId: string,
    item: CartItem
) => {
    const itemRef = doc(db, 'carts', userId, 'items', item.id);

    const snapshot = await getDoc(itemRef)
    
    if (snapshot.exists()) {
        await updateDoc(itemRef, {
            quantity: increment(1),
        });
    } else {
        await setDoc(itemRef, {
            ...item, quantity: 1,
        });
    };
};

const removeItem = async (userId: string, productId: string) => {
    await deleteDoc(doc(db, 'carts', userId, 'items', productId));
};

const incrementQuantity = async (userId: string, productId: string) => {
    
    const itemRef = doc(db, 'carts', userId, 'items', productId)
    
    await updateDoc(itemRef, {
        quantity: increment(1),
    });
};

const decrementQuantity = async (userId: string, productId: string) => {
    
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

export default { addItem, removeItem, incrementQuantity, decrementQuantity};