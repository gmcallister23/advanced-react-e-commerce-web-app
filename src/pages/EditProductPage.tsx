import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import type { Product, Category } from '../types/types';
import { useProductContext } from '../context/ProductContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/api';
import NavBar from '../components/Navbar/NavBar';
import { Nav } from 'react-bootstrap';

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

    return (
        <div>
            <nav>
                <NavBar />
            </nav>

            <div className='container py-3'>
                <div className='row g-4 justify-content-center'>
                    {filteredProducts.map((product: Product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>

        </div>
    )

}   

export default EditProductPage;
