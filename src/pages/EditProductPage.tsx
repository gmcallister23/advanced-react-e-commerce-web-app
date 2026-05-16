import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
//import { Link } from 'react-router-dom';
import type { Product, Category } from '../types/types';
import { useProductContext } from '../context/ProductContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/api';
import NavBar from '../components/Navbar/NavBar';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
//import { Nav } from 'react-bootstrap';

const EditProductPage: React.FC = () => {

    const { products, dispatch, selectedCategory } = useProductContext();
    
    const { data: productsData} = useQuery ({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    useEffect(() => {
        if (productsData)
            dispatch({ type: 'SET_PRODUCTS', payload: productsData })
    }, [dispatch, productsData])

    const getFilteredProducts = () => {
        if(selectedCategory) {
            return products.filter((product:Product) => product.category === selectedCategory);
        }
        return products;
    };

    const filteredProducts = getFilteredProducts();

    const handleDelete = async (documentId: string) => {
        try {
            await deleteDoc(doc(db, 'products', documentId));
            console.log('Document successfully deleted!')
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    }

    return (
        <div>
            <nav>
                <NavBar />
            </nav>

            <div className='container py-3'>
                <div className='row g-4 justify-content-center'>
                    {filteredProducts.map((product: Product) => (
                    <div key={product.id}>
                        <ProductCard product={product} key={product.id} />
                        <button className="danger" onClick={() => handleDelete(product.id)}>Delete Item</button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )

}   

export default EditProductPage;
