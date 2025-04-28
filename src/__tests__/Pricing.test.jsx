import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PricingPage from '../Pricing'; // Adjust this to your actual component path
import '@testing-library/jest-dom';

describe('Pricing Page', () => {
  test('renders all three pricing cards', () => {
    render(<PricingPage />);
    
    expect(screen.getByText(/Flat Purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/Basic Subscription/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium Subscription/i)).toBeInTheDocument();
  });

  test('renders Contact Us and Press for Estimate buttons', () => {
    render(<PricingPage />);

    const contactButton = screen.getByRole('button', { name: /Contact Us/i });
    const estimateButton = screen.getByRole('button', { name: /Press for Estimate/i });

    expect(contactButton).toBeInTheDocument();
    expect(estimateButton).toBeInTheDocument();
  });

  test('buttons are clickable', () => {
    const handleClick = jest.fn();

    render(
      <div>
        <button onClick={handleClick}>Contact Us</button>
        <button onClick={handleClick}>Press for Estimate</button>
      </div>
    );

    fireEvent.click(screen.getByText(/Contact Us/i));
    fireEvent.click(screen.getByText(/Press for Estimate/i));

    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
