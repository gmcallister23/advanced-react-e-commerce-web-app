import { useEffect, useState} from 'react';
import type { Product, Category } from '../types/types';
import ProductCard  from '../components/ProductCard';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/api';
import { fetchCategories } from '../api/api';
import NavBar from '../components/NavBar';

const Home: React.FC = () => {

    
    const navigate = useNavigate()
    //const [products, setProducts] = useState<Product[]>([]);
    const {products, dispatch, selectedCategory} = useProductContext();
    
    const { data: productsData, isLoading }  = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,

    });

    useEffect(() => {
        if (productsData)
        dispatch({ type: 'SET_PRODUCTS', payload: productsData.data })
    }, [dispatch, productsData]);

    const getFilteredProducts = () => {
        if(selectedCategory) {
            return products.filter((product:Product) => product.category === selectedCategory);
        }
        return products;
    };

    const filteredProducts = getFilteredProducts();


    // useEffect(() => {
    //     const fetchProducts = async() => {
    //         const response = await fetch("https://fakestoreapi.com/products");
    //         const data = await response.json();
    //         //setProducts(data);
    //         dispatch({type:'SET_PRODUCTS', payload: data})//--> same as setProducts, just for global state
    //     };
    //     fetchProducts();
    // }, [dispatch]);

    return (
        
        <div>
            
        <nav>
            <NavBar />
        </nav>
            
            {/* 
            <button onClick={() => navigate('/profile')}>Go to Profile Page</button>
            {isLoading && (<h1>Loading...</h1>)}
            <button onClick={() => navigate('/cart')}>Cart</button>
            ***Moved to navbar, not needed anymore***
            */}
            
            
            <div className="d-flex flex-wrap p-2 justify-content-center">
            {filteredProducts.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
        ))}
     </div>
     </div>
    )
}

export default Home