//Unit Test

import { render, screen } from '@testing-library/react';
import Cart from '../pages/Cart';

describe('Cart', () => {
    it('shows empty cart message', () => {
        render(<Cart items={()} />);

        expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
    });
})