import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/api';
import type { Product, Category } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { useProductContext } from '../context/ProductContext';

const NavBar = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    
    const {products, dispatch, selectedCategory} = useProductContext();

    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity, 0
    );

        const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    }); 

    const getFilteredProducts = () => {
        if(selectedCategory) {
            return products.filter((product:Product) => product.category === selectedCategory);
        }
        return products;
    };

    const filteredProducts = getFilteredProducts();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Shop</Link>
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/profile">Profile</Link>
                    <Link className="nav-item nav-link" to="/cart">Cart({totalQuantity})</Link>
                </div>
                <div>
                    <select onChange={(e) => 
                    dispatch({type: 'SET_SELECTED_CATEGORY', payload: e.target.value}) 
                    }
                        value={selectedCategory}
                    >
                    <option value=''> All Categories</option>
                    {categories?.data.map((category: Category) => (
                    <option value={category} key={category}>
                        {category}
                    </option>
                    ))}
                    </select>
            
                    <button className='btn' onClick={() => dispatch({type: "SET_SELECTED_CATEGORY", payload: ''})}>
                    Clear Filter
                    </button>
                </div>
        </nav>

    )
}

export default NavBar;