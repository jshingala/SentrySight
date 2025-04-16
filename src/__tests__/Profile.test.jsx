import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../Profile';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock global fetch
global.fetch = jest.fn();

const mockUserData = {
  email: 'test@example.com',
  business_name: 'Test Business',
  contact_number: '1234567890',
  share: '10%',
  address1: '123 Main St',
  address2: 'Apt 2',
  city: 'Testville',
  state: 'CA',
  postal_code: '99999',
  country: 'United States'
};

const mockCountries = [
  { name: { common: 'United States' } },
  { name: { common: 'Canada' } },
  { name: { common: 'Germany' } }
];

describe('Profile Component', () => {
  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.includes('user-profile')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUserData),
        });
      }
      if (url.includes('restcountries')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCountries),
        });
      }
      if (url.includes('update-address')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Address updated successfully' }),
        });
      }
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  const renderProfile = () => {
    const setUserEmail = jest.fn();
    const setIsAdmin = jest.fn();

    render(
      <BrowserRouter>
        <Profile
          userEmail="test@example.com"
          setUserEmail={setUserEmail}
          setIsAdmin={setIsAdmin}
        />
      </BrowserRouter>
    );

    return { setUserEmail, setIsAdmin };
  };

  test('renders user profile data', async () => {
    renderProfile();
    await waitFor(() => {
      expect(screen.getByText('Test Business')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Testville')).toBeInTheDocument();
    });
  });

  test('toggles edit mode and cancels it', async () => {
    renderProfile();
    await waitFor(() => screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByPlaceholderText('Address Line 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });

  test('edits and submits address form', async () => {
    renderProfile();
    await waitFor(() => screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'New City' },
    });
    fireEvent.change(screen.getByDisplayValue('United States'), {
      target: { value: 'Canada' },
    });

    fireEvent.click(screen.getByText('Done'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('update-address'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  test('logs out and clears state', async () => {
    const { setUserEmail, setIsAdmin } = renderProfile();
    await waitFor(() => screen.getByText('Sign Out'));
    fireEvent.click(screen.getByText('Sign Out'));

    expect(setUserEmail).toHaveBeenCalledWith('');
    expect(setIsAdmin).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
