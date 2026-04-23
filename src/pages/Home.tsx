import { useEffect, useState} from 'react';
import type { Product } from '../types/types';
import ProductCard  from '../components/ProductCard';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    
    const navigate = useNavigate()
    //const [products, setProducts] = useState<Product[]>([]);
    const {products, dispatch, selectedCategory} = useProductContext()
    

    useEffect(() => {
        const fetchProducts = async() => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            //setProducts(data);
            dispatch({type:'SET_PRODUCTS', payload: data})//--> same as setProducts, just for global state
        };
        fetchProducts();
    }, [dispatch]);

    return (
        <div>
            <button onClick={() => navigate('/profile')}>Go to Profile Page</button>
     <div className="d-flex flex-wrap p-2 justify-content-center">
        {products.map((product: Product) => (
            <ProductCard product={product} />
        ))}
     </div>
     </div>
    )
}

export default Home