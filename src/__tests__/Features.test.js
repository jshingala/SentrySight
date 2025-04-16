import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from './Features';

jest.mock('react-icons/bi', () => ({
  BiBell: () => <div data-testid="icon-bell" />,
  BiCloud: () => <div data-testid="icon-cloud" />,
  BiDesktop: () => <div data-testid="icon-desktop" />,
  BiShield: () => <div data-testid="icon-shield" />,
  BiVideo: () => <div data-testid="icon-video" />
}));

jest.mock('react-icons/io', () => ({
  IoIosArrowBack: () => <div data-testid="arrow-back" />,
  IoIosArrowForward: () => <div data-testid="arrow-forward" />
}));

jest.mock('./features.css', () => ({}));

describe('Features Component', () => {
  beforeEach(() => {
    const { container } = render(<Features />);
    container.querySelectorAll('.indicator-dot').forEach(dot => {
      dot.setAttribute('role', 'tab');
    });
  });

  test('renders the component with title', () => {
    expect(screen.getByText('Key Features')).toBeInTheDocument();
  });

  test('renders the initial active feature card', () => {
    expect(screen.getByText('24/7 Monitoring and Alerts')).toBeInTheDocument();
    expect(screen.getByText('Provides continuous monitoring and instant alerts to keep you informed of any unusual activity, day or night.')).toBeInTheDocument();
  });

  test('renders navigation arrows', () => {
    expect(screen.getByTestId('arrow-back')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-forward')).toBeInTheDocument();
  });

  test('renders indicator dots for all features', () => {
    const dots = screen.getAllByRole('tab');
    expect(dots.length).toBe(5);
  });

  test('clicking next arrow moves to the next slide', () => {
    const nextButton = screen.getByTestId('arrow-forward').closest('button');
    
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Cloud-Based Data Management')).toBeInTheDocument();
    expect(screen.getByText('Utilizes cloud storage to securely manage and analyze data, making it accessible from anywhere and ensuring reliability.')).toBeInTheDocument();
  });

  test('clicking previous arrow moves to the previous slide', () => {
    const prevButton = screen.getByTestId('arrow-back').closest('button');
    const nextButton = screen.getByTestId('arrow-forward').closest('button');
    
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    
    expect(screen.getByText('24/7 Monitoring and Alerts')).toBeInTheDocument();
  });

  test('clicking on an indicator dot navigates to that feature', () => {
    const dots = screen.getAllByRole('tab');
    
    fireEvent.click(dots[2]);
    
    expect(screen.getByText('User-Friendly Interface')).toBeInTheDocument();
  });

  test('carousel wraps around when reaching the end', () => {
    const nextButton = screen.getByTestId('arrow-forward').closest('button');
    
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton);
    }
    
    expect(screen.getByText('24/7 Monitoring and Alerts')).toBeInTheDocument();
  });

  test('carousel wraps around when going back from the first slide', () => {
    const prevButton = screen.getByTestId('arrow-back').closest('button');
    
    fireEvent.click(prevButton);
    
    expect(screen.getByText('Advanced Firearm Detection')).toBeInTheDocument();
  });

  test('correct feature card has active class', () => {
    const nextButton = screen.getByTestId('arrow-forward').closest('button');
    
    let activeCard = screen.getByText('24/7 Monitoring and Alerts').closest('.feature-card');
    expect(activeCard).toHaveClass('active');
    
    fireEvent.click(nextButton);
    
    activeCard = screen.getByText('Cloud-Based Data Management').closest('.feature-card');
    expect(activeCard).toHaveClass('active');
  });
});