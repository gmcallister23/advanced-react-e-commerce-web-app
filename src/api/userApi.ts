import type { UserProfile } from "../types/types";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';


export const createUserProfile = async (user: any) => {
    await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        address: null,
        dateOfBirth: null,
        createdAt: serverTimestamp(),
        profileComplete: false
    });
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const ref = doc(db, 'users', uid);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
        //throw new Error('User profile not found');
    }

    return {
        uid: snapshot.id,
        ...snapshot.data(),
    } as UserProfile;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    await setDoc(doc(db, 'users', uid), data, {merge: true} );
};