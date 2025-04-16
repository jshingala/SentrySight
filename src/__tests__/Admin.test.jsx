import { render, screen } from '@testing-library/react';
import React from 'react';
import Admin from '../Admin';

describe('Admin Component', () => {
    test('renders Admin Dashboard heading', () => {
        render(<Admin />);
        const heading = screen.getByText(/Admin Dashboard/i);
        expect(heading).toBeInTheDocument();
    });

    test('renders user table with correct data', () => {
        render(<Admin />);
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(4); 

        const user1 = screen.getByText('Mock Name 1');
        const user2 = screen.getByText('Mock Name 2');
        const user3 = screen.getByText('Mock Name 3');

        expect(user1).toBeInTheDocument();
        expect(user2).toBeInTheDocument();
        expect(user3).toBeInTheDocument();
    });

    test('renders correct button text based on user status', () => {
        render(<Admin />);
        
        const buttons = screen.getAllByText(/Activate|Deactivate/);
        
        expect(buttons[0]).toHaveTextContent('Deactivate');
        expect(buttons[1]).toHaveTextContent('Activate');
    });

});
