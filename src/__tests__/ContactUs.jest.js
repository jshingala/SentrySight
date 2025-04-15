import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ContactUs from 'src/ContactUs.jsx';

describe('ContactUs Component', () => {
  test('renders the heading and description', () => {
    render(<ContactUs />);
    
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText(/Ready to enhance your security with AI-powered solutions/i)).toBeInTheDocument();
  });

  test('renders all three contact cards', () => {
    render(<ContactUs />);
    
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
  });

  test('displays correct contact information', () => {
    render(<ContactUs />);
    
    const phoneLink = screen.getByText('(916) 425-6820');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:1-916-425-6820');
    
    const emailLink = screen.getByText('contact@sentrysight.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:modernritchie@yahoo.com');
  });
  
  test('displays business hours information', () => {
    render(<ContactUs />);
    
    expect(screen.getByText('Mon - Fri: 9AM - 6PM')).toBeInTheDocument();
    expect(screen.getByText('24/7 Emergency Support')).toBeInTheDocument();
  });
  
  test('renders footer text', () => {
    render(<ContactUs />);
    
    expect(screen.getByText(/Experience the future of security with SentrySight's AI-powered solutions/i)).toBeInTheDocument();
  });
});