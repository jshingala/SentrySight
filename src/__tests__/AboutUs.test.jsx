import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../AboutUs';

jest.mock('../assets/pic1.jpg', () => 'mocked-image-path-1');
jest.mock('../assets/pic2.jpg', () => 'mocked-image-path-2');
jest.mock('../assets/pic3.jpg', () => 'mocked-image-path-3');

describe('AboutUs Component', () => {
  test('renders the AboutUs page without crashing', () => {
    render(<AboutUs />);
    expect(screen.getByText(/About SentrySight/i)).toBeInTheDocument();
  });

  test('displays all section headings', () => {
    render(<AboutUs />);
    expect(screen.getByRole('heading', { name: /Our Mission/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What We Offer/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Meet Our Team/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Join Us in Making a Safer Tomorrow/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Awards & Recognition/i, level: 2 })).toBeInTheDocument();
  });

  test('renders award gallery with images and captions', () => {
    render(<AboutUs />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(screen.getByAltText(/Award 1/i)).toBeInTheDocument();
    expect(screen.getByText(/1st Place AI Hackathon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Award 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Second Place University Pitch Comp/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Award 3/i)).toBeInTheDocument();
    expect(screen.getByText(/2nd Place Statewide Competition/i)).toBeInTheDocument();
  });

  test('opens and closes the modal when award images are clicked', () => {
    render(<AboutUs />);
    const awardImages = screen.getAllByRole('img');

    fireEvent.click(awardImages[0]);
    expect(screen.getByAltText(/Full Screen Award/i)).toBeInTheDocument();

    fireEvent.click(screen.getByClassName('modal-overlay'));
    expect(screen.queryByAltText(/Full Screen Award/i)).toBeNull();

    fireEvent.click(awardImages[1]);
    expect(screen.getByAltText(/Full Screen Award/i)).toBeInTheDocument();

    fireEvent.click(screen.getByClassName('modal-content'));
    expect(screen.queryByAltText(/Full Screen Award/i)).toBeNull();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<AboutUs />);
    expect(container.querySelector('.about-us')).toBeInTheDocument();
    expect(container.querySelector('.awards-section')).toBeInTheDocument();
    expect(container.querySelector('.awards-gallery')).toBeInTheDocument();
    expect(container.querySelectorAll('.award-item')).toHaveLength(3);
    expect(container.querySelector('.modal-overlay')).toBeNull(); // Initially modal is closed
  });


});