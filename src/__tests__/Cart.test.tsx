//Unit Test

import { render, screen } from '@testing-library/react';
import CartItem from '../components/CartItem';

describe('CartItem', () => {
    it('renders cart item info', () => {
        
        const item = {
            productId: '1',
            title: 'Baseball Cleats',
            price: 75,
            quantity: 1,
            description: '',
            image: '',
        }

        
        render(<CartItem item={item} />);

        expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
    });

        expect(screen.getByText('Baseball Cleats')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
        expect(screen.getByText('$75')).toBeInTheDocument();
    })
