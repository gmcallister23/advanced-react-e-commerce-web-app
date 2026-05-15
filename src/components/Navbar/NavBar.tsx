import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../api/api';
import type { Product, Category } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import { useProductContext } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import "./Navbar.css";


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
    
    const { user } = useAuth();
    
    return (    
        <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle ps-3 gap-3 fixed-top">
            <Link className="navbar-brand" to='/'>Shop</Link>
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/cart">Cart({totalQuantity})</Link>
                    {user ? (
                        <>
                        
                        <Link className="nav-item nav-link" to="/profile">Profile</Link>
                        <Link className="nav-item nav-link" to="/logout">Logout</Link>
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
            
                        <button className='btn bg-light ms-3' onClick={() => dispatch({type: "SET_SELECTED_CATEGORY", payload: ''})}>
                        Clear Filter
                        </button>
                        </div>
                        
                        
                        </>
                    ) : (
                        <>
                            <Link className="nav-item nav-link" to='/register'>Register</Link>
                            <Link className="nav-item nav-link" to='/login'>Login</Link>
                        
                        </>

                    )}
                    
                    
                    
                </div>
               
        </nav>

    )
}

export default NavBar;

//optional css -- I used bootstrap to style the page, this is an option for custom css
// <div className='nav-container>
    //<Link className='link>