import { useEffect, useState} from 'react';
import type { Product } from '../types/types';
import ProductCard  from '../components/ProductCard';

const Home: React.FC = () => {

    

    const [products, setProducts] = useState<Product[]>([]);

    

    useEffect(() => {
        const fetchProducts = async() => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
     <div className="d-flex flex-wrap p-2 justify-content-center">
        {products.map((product: Product) => (
            <ProductCard product={product} />
        ))}
     </div>
    )
}

export default Home