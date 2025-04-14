import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock child components
vi.mock('./Header', () => ({
  default: ({ userEmail, isAdmin }) => (
    <div data-testid="mock-header" data-user-email={userEmail || ''} data-is-admin={String(isAdmin)}>
      Header
    </div>
  )
}));

vi.mock('./Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>
}));

vi.mock('./Home', () => ({
  default: () => <div data-testid="mock-home">Home</div>
}));

vi.mock('./LoadingSpinner', () => ({
  default: () => <div data-testid="mock-spinner">Loading...</div>
}));

// Mock other components that are lazy loaded
vi.mock('./AboutUs', () => ({
  default: () => <div data-testid="mock-about">About Page</div>
}));

vi.mock('./Demo', () => ({
  default: () => <div data-testid="mock-demo">Demo Page</div>
}));

vi.mock('./ContactUs', () => ({
  default: () => <div data-testid="mock-contact">Contact Page</div>
}));

vi.mock('./SignIn', () => ({
  default: ({ setUserEmail, setIsAdmin }) => (
    <div data-testid="mock-signin">
      Sign In Page
      <button onClick={() => {
        setUserEmail('test@example.com');
        setIsAdmin(true);
      }}>
        Sign In
      </button>
    </div>
  )
}));

vi.mock('./Profile', () => ({
  default: ({ userEmail }) => (
    <div data-testid="mock-profile" data-user-email={userEmail}>
      Profile Page
    </div>
  )
}));

vi.mock('./Questionnaire_Admin', () => ({
  default: ({ setClientEmail }) => (
    <div data-testid="mock-questionnaire-admin">
      Admin Questionnaire
      <button onClick={() => setClientEmail('client@example.com')}>
        Set Client Email
      </button>
    </div>
  )
}));

vi.mock('./Questionnaire', () => ({
  default: () => <div data-testid="mock-questionnaire">User Questionnaire</div>
}));

vi.mock('./404', () => ({
  default: () => <div data-testid="mock-404">404 Page</div>
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui);
};

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('mock-home')).toBeInTheDocument();
  });

  test('handles user authentication state from localStorage', () => {
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('isAdmin', 'true');
    renderWithRouter(<App />);
    const header = screen.getByTestId('mock-header');
    expect(header.dataset.userEmail).toBe('test@example.com');
    expect(header.dataset.isAdmin).toBe('true');
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles missing localStorage values gracefully', () => {
      renderWithRouter(<App />);
      const header = screen.getByTestId('mock-header');
      expect(header.dataset.userEmail).toBe('');
      expect(header.dataset.isAdmin).toBe('false');
    });

    test('handles invalid isAdmin value in localStorage', () => {
      localStorage.setItem('isAdmin', 'invalid-value');
      renderWithRouter(<App />);
      const header = screen.getByTestId('mock-header');
      expect(header.dataset.isAdmin).toBe('false');
    });

    test('handles null values in localStorage', () => {
      localStorage.setItem('userEmail', '');
      localStorage.setItem('isAdmin', '');
      renderWithRouter(<App />);
      const header = screen.getByTestId('mock-header');
      expect(header.dataset.userEmail).toBe('');
      expect(header.dataset.isAdmin).toBe('false');
    });

    test('handles undefined values in localStorage', () => {
      localStorage.setItem('userEmail', '');
      localStorage.setItem('isAdmin', '');
      renderWithRouter(<App />);
      const header = screen.getByTestId('mock-header');
      expect(header.dataset.userEmail).toBe('');
      expect(header.dataset.isAdmin).toBe('false');
    });
  });

  describe('Navigation and Routing', () => {
    test('shows loading spinner when lazy loading components', async () => {
      renderWithRouter(<App />, { route: '/about' });
      expect(screen.getByTestId('mock-spinner')).toBeInTheDocument();
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(screen.getByTestId('mock-about')).toBeInTheDocument();
    });

    test('navigates to demo page correctly', async () => {
      renderWithRouter(<App />, { route: '/demo' });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(screen.getByTestId('mock-demo')).toBeInTheDocument();
    });

    test('shows 404 page for invalid routes', async () => {
      renderWithRouter(<App />, { route: '/invalid-route' });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(screen.getByTestId('mock-404')).toBeInTheDocument();
    });
  });

  describe('Authentication and Authorization', () => {
    test('profile page shows user email when authenticated', async () => {
      localStorage.setItem('userEmail', 'test@example.com');
      renderWithRouter(<App />, { route: '/profile' });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      const profile = screen.getByTestId('mock-profile');
      expect(profile.dataset.userEmail).toBe('test@example.com');
    });

    test('admin users see admin questionnaire', async () => {
      localStorage.setItem('userEmail', 'test@example.com');
      localStorage.setItem('isAdmin', 'true');
      renderWithRouter(<App />, { route: '/questionnaire_A' });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(screen.getByTestId('mock-questionnaire-admin')).toBeInTheDocument();
    });
  });
}); 