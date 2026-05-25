//Unit Test

import { fireEvent, render, screen } from '@testing-library/react';
import CartItem from '../components/CartItem';
import { incrementQuantity, decrementQuantity, removeItem } from '../api/cartApi';

//Firebase mocks - this mocks firebase and keeps it from loading
jest.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        user: { uid: '123'}
    })
}));

jest.mock('../api/cartApi', () => ({
    incrementQuantity: jest.fn(),
    decrementQuantity: jest.fn(),
    removeItem: jest.fn(),
}))
 
describe('CartItem', () => {
    it('renders cart item info', () => {
        
        const item = {
            productId: '1',
            title: 'Baseball Cleats',
            price: 75,
            quantity: 2,
            description: '',
            image: 'test-image.jpg',
        }

        const expectedSubtotal = item.price * item.quantity;

        
        render(<CartItem item={item} />);
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('-'));
        fireEvent.click(screen.getByText('🗑️'))

        expect(screen.getByText('Baseball Cleats')).toBeInTheDocument();
        expect(screen.getByText('Qty: 2')).toBeInTheDocument();
        expect(screen.getByText('$ 75')).toBeInTheDocument();
        expect(screen.getByText(`$ ${expectedSubtotal}`)).toBeInTheDocument();
        expect(incrementQuantity).toHaveBeenCalledTimes(1);
        expect(decrementQuantity).toHaveBeenCalledTimes(1);
        expect(removeItem).toHaveBeenCalledTimes(1);
    });

        
    })


//alternately could use 'expect(screen.getAllByText('$ 75').length).toBe(2); specifically if quantity is 1, creating multiple of the same value