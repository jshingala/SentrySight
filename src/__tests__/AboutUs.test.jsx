import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../AboutUs';
import { TranslationProvider } from '../context/TranslationContext';

jest.mock('../context/TranslationContext', () => ({
  useTranslation: () => ({
    translateText: (text) => Promise.resolve(text), // Just return the original text
    language: 'en'
  }),
  TranslationProvider: ({ children }) => <div>{children}</div>
}));

// Mock the image paths to avoid issues with file imports
jest.mock('src/assets/pic1.jpg', () => 'mocked-image-path-1');
jest.mock('src/assets/pic2.jpg', () => 'mocked-image-path-2');
jest.mock('src/assets/pic3.jpg', () => 'mocked-image-path-3');

describe('AboutUs Component', () => {
  test('renders the AboutUs page without crashing', async () => {
    render(
      <TranslationProvider>
        <AboutUs />
      </TranslationProvider>
    );
    const heading = await screen.findByText(/About SentrySight/i);
    expect(heading).toBeInTheDocument();
  });
  test('displays all section headings', async () => {
    await act(async () => {
      render(
        <TranslationProvider>
          <AboutUs />
        </TranslationProvider>
      );
    });
  
    const missionHeading = await screen.findByRole('heading', { name: /Our Mission/i, level: 3 });
    expect(missionHeading).toBeInTheDocument();
  
    const offerHeading = await screen.findByRole('heading', { name: /What We Offer/i, level: 3 });
    expect(offerHeading).toBeInTheDocument();
  
    const teamHeading = await screen.findByRole('heading', { name: /Meet Our Team/i, level: 3 });
    expect(teamHeading).toBeInTheDocument();

    const joinHeading = await screen.findByRole('heading', { name: /Join Us in Making a Safer Tomorrow/i, level: 3 });
    expect(joinHeading).toBeInTheDocument();

    const awardsHeading = await screen.findByRole('heading', { name: /Awards & Recognition/i, level: 2 }); // Assuming h2
    expect(awardsHeading).toBeInTheDocument();
  });
  
  test('renders award gallery with images and captions', async () => {
    render(
      <TranslationProvider>
        <AboutUs />
      </TranslationProvider>
    );

    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(3);

    const award1Caption = await screen.findByText(/1st Place AI Hackathon/i);
    expect(award1Caption).toBeInTheDocument();

    const award2Caption = await screen.findByText(/Second Place University Pitch Competition/i);
    expect(award2Caption).toBeInTheDocument();

    const award3Caption = await screen.findByText(/2nd Place Statewide Competition/i);
    expect(award3Caption).toBeInTheDocument();
  });

  test('verifies motion animations are applied to elements', () => {
    const { container } = render(
      <TranslationProvider>
        <AboutUs />
      </TranslationProvider>
    );

    const aboutUsContainer = container.querySelector('.about-us');
    expect(aboutUsContainer).toBeInTheDocument();
    
    const motionDivs = container.querySelectorAll('div[style*="transform"]'); 
    expect(motionDivs.length).toBeGreaterThan(0); 
  });

  test('applies correct CSS classes', async () => {
    const { container } = render(
      <TranslationProvider>
        <AboutUs />
      </TranslationProvider>
    );

    const aboutUsContainer = container.querySelector('.about-us');
    expect(aboutUsContainer).toBeInTheDocument();

    const awardsSection = container.querySelector('.awards-section');
    expect(awardsSection).toBeInTheDocument();

    const awardsGallery = container.querySelector('.awards-gallery');
    expect(awardsGallery).toBeInTheDocument();

    const awardItems = container.querySelectorAll('.award-item');
    expect(awardItems.length).toBe(3);
  });
});