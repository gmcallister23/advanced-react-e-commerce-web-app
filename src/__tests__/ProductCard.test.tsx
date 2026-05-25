//Unit Test
import { render, screen, fireEvent } from '@testing-library/react';
import type { Product } from '../types/types';
import ProductCard from '../components/ProductCard';
import { addItem } from '../api/cartApi';

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

jest.mock('../api/cartApi', () => ({addItem: jest.fn()}))
jest.mock('../context/AuthContext', () => ({useAuth: () => ({user: {uid: '123'}})}))

describe('ProductCard', () => {
    it('renders product info correctly', () => {
        render(<ProductCard product={mockProduct} />)

        expect(screen.getByText('Baseball Cleats')).toBeInTheDocument();
        expect(screen.getByText('$75')).toBeInTheDocument();
    });

    it('calls addToCart when button is clicked', async () => {
        
        //const addItem = jest.fn();

        render(<ProductCard product={mockProduct} />);

        fireEvent.click(screen.getByRole('button', { name: /add to cart/i}));
        
        expect(addItem).toHaveBeenCalledTimes(1);
    })
})