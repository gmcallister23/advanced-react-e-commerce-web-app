//import axios, {type AxiosResponse} from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import type { Product, Category } from '../types/types';
import { db } from '../lib/firebaseConfig';


const productsRef = collection(db, 'products');

export const fetchProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsRef);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
};

export const fetchCategories = async (): Promise<Category[]> => {
    const snapshot = await getDocs(productsRef);

    const categories = snapshot.docs.map(
        (doc) => doc.data().category
    );
    return [...new Set(categories)] as Category[];

};

// const apiClient = axios.create({
//     baseURL:'https://fakestoreapi.com'
// })

// export const fetchProducts = ():Promise<AxiosResponse<Product[]>> => apiClient.get<Product[]>('/products')

// export const fetchCategories = ():Promise<AxiosResponse<Category[]>> => apiClient.get<Category[]>('/products/categories')

