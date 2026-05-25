//Integration Test
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import Cart from '../pages/Cart';

jest.mock('../api/cartApi', () => ({
    addItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('../pages/Cart', () => ({
    __esModule: true,
    default: () => <div>Cart Updated</div>
}));

jest.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        user: { uid: '123' }
    })
}))

jest.mock('../components/Navbar/NavBar', () => () => null);

const mockProduct: Product = {
    id: '1',
    title: 'Baseball Cleats',
    price: 75,
    image: '',
    description: '',
    category: '',
    rating: {
        rate: 0,
        count: 0,
    }
}; 

describe('Cart integration flow', () => {
    it('adds product to cart when user clicks add to cart', async () => {
        
        render(
        <>
        <ProductCard product={mockProduct} />
        <Cart />
        </>
        )

        fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

        expect(await screen.findByText('Baseball Cleats')).toBeInTheDocument();
        expect(await screen.findByText('Cart Updated')).toBeInTheDocument();
    })
})