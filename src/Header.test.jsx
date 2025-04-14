import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// Mock the Logo import
vi.mock('./assets/Logo.png', () => ({
  default: 'mocked-logo-path'
}));

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true
});

const renderHeader = (props = {}) => {
  return render(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset window width to desktop size
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
    // Clear all mocks
    vi.clearAllMocks();
  });

  test('renders logo and navigation links', () => {
    renderHeader();
    expect(screen.getByAltText('SentrySight Logo')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('shows Sign In link when user is not logged in', () => {
    renderHeader({ userEmail: '' });
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  test('shows Profile link when user is logged in', () => {
    renderHeader({ userEmail: 'test@example.com' });
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  test('toggles theme when theme button is clicked', () => {
    renderHeader();
    const themeButton = screen.getByRole('button', { name: /🌙|☀️/ });
    
    // Initial theme
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    
    // Click to toggle theme
    fireEvent.click(themeButton);
    expect(document.body.getAttribute('data-theme')).toBe('light');
    
    // Click again to toggle back
    fireEvent.click(themeButton);
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });

  test('shows hamburger menu on mobile view', () => {
    // Set window width to mobile size
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    
    renderHeader();
    const menuButton = screen.getByTestId('menu-icon');
    expect(menuButton).toBeInTheDocument();
  });

  test('toggles mobile menu when hamburger is clicked', () => {
    // Set window width to mobile size
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    
    renderHeader();
    const menuButton = screen.getByTestId('menu-icon');
    
    // Click to open menu
    fireEvent.click(menuButton);
    expect(screen.getByText('About').closest('.dropdown-menu')).toBeInTheDocument();
    
    // Click to close menu
    fireEvent.click(menuButton);
    expect(screen.queryByText('About', { selector: '.dropdown-menu *' })).not.toBeInTheDocument();
  });

  test('shows correct questionnaire link for admin users', () => {
    renderHeader({ isAdmin: true });
    const questionnaireLink = screen.getByText('Questionnaire');
    expect(questionnaireLink.getAttribute('href')).toBe('/questionnaire_A');
  });

  test('shows correct questionnaire link for regular users', () => {
    renderHeader({ isAdmin: false });
    const questionnaireLink = screen.getByText('Questionnaire');
    expect(questionnaireLink.getAttribute('href')).toBe('/questionnaire');
  });

  test('clicking logo navigates to home and reloads page', () => {
    renderHeader();
    const logo = screen.getByAltText('SentrySight Logo');
    fireEvent.click(logo);
    expect(mockReload).toHaveBeenCalled();
  });
}); 