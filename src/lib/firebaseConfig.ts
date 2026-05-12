import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBc4SNBLuDTKDeMiMKRb5kCrEmEh3sHqRQ",
  authDomain: "e-commerce-app-cac3a.firebaseapp.com",
  projectId: "e-commerce-app-cac3a",
  storageBucket: "e-commerce-app-cac3a.firebasestorage.app",
  messagingSenderId: "235066251880",
  appId: "1:235066251880:web:25d9543e3859295c14b9dd"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { db };

export { auth };