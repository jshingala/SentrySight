/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import '@testing-library/jest-dom';

// Mock CSS imports
jest.mock('./global.css', () => ({}));
jest.mock('./header.css', () => ({}));

// Mock Logo import
jest.mock('./assets/Logo.png', () => 'logo-path');

// Mock localStorage
const createMockStorage = () => {
  const storage = {};
  return {
    getItem: jest.fn(key => storage[key] || null),
    setItem: jest.fn((key, value) => { storage[key] = value; }),
    clear: jest.fn(() => Object.keys(storage).forEach(key => delete storage[key])),
    removeItem: jest.fn(key => delete storage[key]),
  };
};

// Wrapper component to provide router context
const HeaderWrapper = ({ userEmail, isAdmin }) => {
  return (
    <BrowserRouter>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  let mockStorage;
  
  beforeEach(() => {
    mockStorage = createMockStorage();
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true
    });

    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024
    });
  });

  afterEach(() => {
    mockStorage.clear();
    jest.clearAllMocks();
  });

  test('renders logo', async () => {
    render(<HeaderWrapper />);
    const logo = await screen.findByAltText('SentrySight Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation links', async () => {
    render(<HeaderWrapper />);
    await waitFor(() => {
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Demo')).toBeInTheDocument();
      expect(screen.getByText('Questionnaire')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  test('shows Sign In when user is not logged in', async () => {
    render(<HeaderWrapper userEmail={null} />);
    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  test('shows Profile when user is logged in', async () => {
    render(<HeaderWrapper userEmail="test@example.com" />);
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
  });

  test('toggles theme when theme button is clicked', async () => {
    render(<HeaderWrapper />);
    const themeButton = await screen.findByRole('button', { name: /☀️|🌙/ });
    
    // Initial theme
    expect(mockStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    
    // Toggle theme
    await act(async () => {
      fireEvent.click(themeButton);
    });

    await waitFor(() => {
      expect(mockStorage.setItem).toHaveBeenCalledWith('theme', 'light');
      expect(document.body.getAttribute('data-theme')).toBe('light');
    });
  });

  test('persists theme in localStorage', async () => {
    mockStorage.getItem.mockReturnValue('light');
    render(<HeaderWrapper />);
    await waitFor(() => {
      expect(document.body.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('Mobile Menu', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 768
      });
    });

    test('shows mobile menu on small screens', async () => {
      render(<HeaderWrapper />);
      const menuIcon = await screen.findByTestId('menu-icon');
      
      await act(async () => {
        fireEvent.click(menuIcon);
      });
      
      await waitFor(() => {
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Demo')).toBeInTheDocument();
      });
    });

    test('closes menu when item is clicked', async () => {
      render(<HeaderWrapper />);
      const menuIcon = await screen.findByTestId('menu-icon');
      
      // Open menu
      await act(async () => {
        fireEvent.click(menuIcon);
      });

      const aboutLink = await screen.findByText('About');
      
      // Click menu item
      await act(async () => {
        fireEvent.click(aboutLink);
      });
      
      // Menu should be closed
      await waitFor(() => {
        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      });
    });

    test('handles window resize', async () => {
      render(<HeaderWrapper />);
      
      await act(async () => {
        window.innerWidth = 1024;
        window.dispatchEvent(new Event('resize'));
      });
      
      await waitFor(() => {
        expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });
    });
  });

  test('shows admin questionnaire link when user is admin', async () => {
    render(<HeaderWrapper userEmail="admin@example.com" isAdmin={true} />);
    const questionnaireLink = await screen.findByText('Questionnaire');
    expect(questionnaireLink.getAttribute('href')).toBe('/questionnaire_A');
  });

  test('shows regular questionnaire link when user is not admin', async () => {
    render(<HeaderWrapper userEmail="user@example.com" isAdmin={false} />);
    const questionnaireLink = await screen.findByText('Questionnaire');
    expect(questionnaireLink.getAttribute('href')).toBe('/questionnaire');
  });

  test('handles scroll event', async () => {
    render(<HeaderWrapper />);
    const header = screen.getByRole('banner');
    
    await act(async () => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    
    await waitFor(() => {
      expect(header).toHaveClass('scrolled');
    });
    
    await act(async () => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });
    
    await waitFor(() => {
      expect(header).not.toHaveClass('scrolled');
    });
  });
}); 