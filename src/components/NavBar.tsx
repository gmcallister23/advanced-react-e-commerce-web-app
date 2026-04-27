import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const NavBar = () => {
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href='/'>Shop</a>
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/profile">Profile</a>
                    <a className="nav-item nav-link" href="/cart">Cart({totalQuantity})</a>
                </div>
        </nav>

    )
}

export default NavBar;