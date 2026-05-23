import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
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
        <div className='bg-warning-subtle pt-5 vh-100'>
            <nav>
                <NavBar />
            </nav>

            <div className='container py-3'>
                <div className='row g-4 justify-content-center'>

                    {filteredProducts.map((product: Product) => (
                     <div className='col-12 col-sm-6 col-lg-4'>
                        <ProductCard product={product} key={product.id}
                            footer={
                            <div className='d-flex gap-2 mt-2'>
                            <Link className='btn btn-success flex-fill' to={`/edit/${product.id}`}>Update Product</Link>
                            
                            <button className="btn btn-danger flex-fill" onClick={() => handleDelete(product.id)}>Delete Item</button>
                            </div>
                            }
                        />
                        
                        
                    </div>
                    ))}

                    
                </div>
            </div>
        </div>
    )

}   

export default EditProductPage;
