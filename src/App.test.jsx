/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';

// Mock CSS imports
jest.mock('./global.css', () => ({}));
jest.mock('./App.css', () => ({}));

// Mock components with simpler implementations
const simpleMock = (testId, text) => () => <div data-testid={testId}>{text}</div>;

jest.mock('./Home', () => simpleMock('home', 'Home Component'));
jest.mock('./404', () => simpleMock('404', '404 Component'));
jest.mock('./ContactUs', () => simpleMock('contact', 'Contact Component'));
jest.mock('./AboutUs', () => simpleMock('about', 'About Component'));
jest.mock('./Footer', () => simpleMock('footer', 'Footer Component'));
jest.mock('./Header', () => 
  ({ userEmail, isAdmin }) => 
    <div data-testid="header">Header Component (User: {userEmail || ''}, Admin: {String(isAdmin || false)})</div>
);
jest.mock('./Demo', () => simpleMock('demo', 'Demo Page'));
jest.mock('./Questionnaire', () => 
  ({ userEmail }) => <div data-testid="questionnaire">Questionnaire Page (User: {userEmail || ''})</div>);
jest.mock('./Questionnaire_Admin', () => simpleMock('questionnaire_a', 'Admin Questionnaire Page'));
jest.mock('./Questionnaire_Client', () => 
  ({ clientEmail }) => <div data-testid="questionnaire_c">Client Questionnaire Page (Client: {clientEmail || ''})</div>);
jest.mock('./Pricing', () => simpleMock('pricing', 'Pricing Page'));
jest.mock('./FAQ', () => simpleMock('faq', 'FAQ Page'));
jest.mock('./SignIn', () => simpleMock('sign-in', 'Sign In Page'));
jest.mock('./SignUp', () => simpleMock('sign-up', 'Sign Up Page'));
jest.mock('./Profile', () =>
  ({ userEmail }) => <div data-testid="profile">Profile Page (User: {userEmail || ''})</div>);
jest.mock('./LoadingSpinner', () => simpleMock('loading-spinner', 'Loading...'));

describe('App Component', () => {
  // Clean up after each test
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    window.localStorage.clear();
  });
  
  const renderApp = async (initialRoute = '/', state = {}) => {
    const history = createMemoryHistory({ initialEntries: [initialRoute] });
    
    // Setup localStorage with initial state
    Object.entries(state).forEach(([key, value]) => {
      window.localStorage.setItem(key, value);
    });

    return render(
      <Router location={history.location} navigator={history}>
        <App CustomRouter={({ children }) => <>{children}</>} />
      </Router>
    );
  };

  it('renders public pages correctly', async () => {
    await act(async () => {
      await renderApp();
    });

    await waitFor(() => {
      expect(screen.getByTestId('home')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  it('handles authentication states', async () => {
    // Test unauthenticated state
    await act(async () => {
      await renderApp('/sign-in');
    });

    await waitFor(() => {
      expect(screen.getByTestId('sign-in')).toBeInTheDocument();
    });

    cleanup();

    // Test authenticated state
    await act(async () => {
      await renderApp('/profile', { userEmail: 'test@example.com' });
    });

    await waitFor(() => {
      expect(screen.getByTestId('profile')).toBeInTheDocument();
      const header = screen.getByTestId('header');
      expect(header).toHaveTextContent('test@example.com');
    });
  });

  it('handles admin and client states', async () => {
    // Test admin user
    await act(async () => {
      await renderApp('/questionnaire', { 
        userEmail: 'admin@example.com', 
        isAdmin: 'true'
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId('questionnaire')).toHaveTextContent('admin@example.com');
    });

    cleanup();

    // Test client questionnaire
    await act(async () => {
      await renderApp('/questionnaire_C', { 
        userEmail: 'test@example.com',
        clientEmail: 'client@example.com' 
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId('questionnaire_c')).toHaveTextContent('client@example.com');
    });
  });

  it('renders static pages', async () => {
    const pages = [
      { path: '/about', testId: 'about' },
      { path: '/contact', testId: 'contact' },
      { path: '/demo', testId: 'demo' },
      { path: '/pricing', testId: 'pricing' },
      { path: '/faq', testId: 'faq' }
    ];

    for (const { path, testId } of pages) {
      await act(async () => {
        await renderApp(path);
      });

      await waitFor(() => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      cleanup();
    }
  });
}); 