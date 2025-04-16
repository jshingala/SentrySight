import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Demo from './Demo'; 

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('./demo.css', () => ({}));

const motionPropsToFilter = ['initial', 'animate', 'exit', 'transition', 'variants', 'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView', 'viewport'];
const createMotionMock = (Component) => ({ children, ...props }) => {
  const filteredProps = Object.keys(props)
    .filter(key => !motionPropsToFilter.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
  return <Component {...filteredProps}>{children}</Component>;
};

jest.mock('framer-motion', () => ({
    motion: {
        div: createMotionMock('div'),
        h1: createMotionMock('h1'),
        p: createMotionMock('p'),
        a: createMotionMock('a'),
        h2: createMotionMock('h2'),
        h3: createMotionMock('h3'),
        button: createMotionMock('button'),
    },
}));

// Mock TranslationContext module
const mockTranslateText = jest.fn((text) => text);
const mockTranslationContextValue = {
  translateText: mockTranslateText,
  language: 'en',
};

jest.mock('./context/TranslationContext', () => ({
    useTranslation: () => mockTranslationContextValue,
}));

// Mock URL.createObjectURL globally
window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();


describe('Demo Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    window.URL.createObjectURL.mockClear();
    window.URL.revokeObjectURL.mockClear();
  });

  describe('When user is not logged in', () => {
    beforeEach(async () => {
      render(<Demo userEmail={null} />);
      await screen.findByText('SentrySight Demo');
    });

    test('renders login required message and button', () => {
      expect(screen.getByText('SentrySight Demo')).toBeInTheDocument();
      expect(screen.getByText('Please log in to experiment with our Demo function')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to Login' })).toBeInTheDocument();
    });

    test('clicking login button navigates to sign-in page', () => {
      const loginButton = screen.getByRole('button', { name: 'Go to Login' });
      fireEvent.click(loginButton);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
    });

    test('does not render upload section or CTA', () => {
      expect(screen.queryByText('Upload an Image for Analysis')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Upload Image' })).not.toBeInTheDocument();
      expect(screen.queryByText('Unlock Full Access')).not.toBeInTheDocument();
    });
  });


  describe('When user is logged in', () => {
    const mockUserEmail = 'test@example.com';

    beforeEach(async () => {
       render(<Demo userEmail={mockUserEmail} />);
       await screen.findByText('SentrySight Demo');
    });

    test('renders hero section with title, description, and Try It Now button', () => {
      expect(screen.getByText('SentrySight Demo')).toBeInTheDocument();
      expect(screen.getByText('Experience the power of advanced security solutions with real-time monitoring and AI-powered insights.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Try It Now' })).toHaveAttribute('href', '#upload-section');
    });

    test('renders How It Works section', () => {
      expect(screen.getByText('How It Works')).toBeInTheDocument();
      expect(screen.getByText('Our system leverages cutting-edge AI technology to analyze images and provide actionable security insights in real-time.')).toBeInTheDocument();
    });

    test('renders Upload section structure (title, input, button)', () => {
      expect(screen.getByText('Upload an Image for Analysis')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Upload Image' })).toBeInTheDocument();
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
    });

     test('renders CTA section', () => {
      expect(screen.getByText('Unlock Full Access')).toBeInTheDocument();
      expect(screen.getByText('Sign up today to gain complete access to all features and benefits of SentrySight.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Sign Up Now' })).toHaveAttribute('href', '/sign-in');
    });

    test('does not initially show image preview or results', () => {
         expect(screen.queryByAltText('Uploaded Preview')).not.toBeInTheDocument();
         expect(screen.queryByAltText('Server Processed Result')).not.toBeInTheDocument();
         expect(screen.queryByText('How was the analysis?')).not.toBeInTheDocument();
    });

    test('selecting a file updates UI (without triggering upload)', async () => {
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();

      const testFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
      window.URL.createObjectURL.mockReturnValue('mock-preview-url');

      await waitFor(() => {
          fireEvent.change(fileInput, { target: { files: [testFile] } });
      });

      expect(await screen.findByAltText('Uploaded Preview')).toBeInTheDocument();
      expect(screen.getByAltText('Uploaded Preview')).toHaveAttribute('src', 'mock-preview-url');
      expect(window.URL.createObjectURL).toHaveBeenCalledWith(testFile);
    });
  });
});