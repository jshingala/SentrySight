import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      email: 'test@example.com',
      business_name: 'Test Corp',
      contact_number: '123-456-7890',
      address1: '123 Main St',
      address2: '',
      city: 'Sacramento',
      state: 'CA',
      postal_code: '95819',
      country: 'United States',
    }),
  })
);

// Mock setUserEmail and setIsAdmin
const mockSetUserEmail = jest.fn();
const mockSetIsAdmin = jest.fn();

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Profile Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    renderWithRouter(
      <Profile
        userEmail="test@example.com"
        setUserEmail={mockSetUserEmail}
        setIsAdmin={mockSetIsAdmin}
      />
    );
  });

  it('renders the profile title', async () => {
    const title = await screen.findByText(/Profile/i);
    expect(title).toBeInTheDocument();
  });

  it('renders user info after fetch', async () => {
    const businessName = await screen.findByText(/Test Corp/);
    const phone = await screen.findByText(/123-456-7890/);
    expect(businessName).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  });

  it('can toggle to edit mode', async () => {
    const editButton = await screen.findByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);

    const address1Input = await screen.findByPlaceholderText('Address Line 1');
    expect(address1Input).toBeInTheDocument();
  });

  it('logs out properly', async () => {
    const logoutButton = await screen.findByText(/Sign Out/i);
    fireEvent.click(logoutButton);

    expect(mockSetUserEmail).toHaveBeenCalledWith('');
    expect(mockSetIsAdmin).toHaveBeenCalledWith(false);
  });
});
