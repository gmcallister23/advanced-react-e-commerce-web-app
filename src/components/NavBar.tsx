import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    
    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity, 0
    );
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Shop</Link>
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/profile">Profile</Link>
                    <Link className="nav-item nav-link" to="/cart">Cart({totalQuantity})</Link>
                </div>
        </nav>

    )
}

export default NavBar;