// __tests__/Questionnaire.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Questionnaire from '../Questionnaire';
import { MemoryRouter } from 'react-router-dom'; // if you navigate after submit
import '@testing-library/jest-dom';

describe('Questionnaire Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Step 1 fields correctly', () => {
    render(<Questionnaire userEmail="test@example.com" />);

    expect(screen.getByTestId('businessName')).toBeInTheDocument();
    expect(screen.getByTestId('industryType')).toBeInTheDocument();
    expect(screen.getByTestId('numEmployees')).toBeInTheDocument();
    expect(screen.getByTestId('dailyVisitors')).toBeInTheDocument();
  });

  it('fills out Step 1 and moves to Step 2', async () => {
    render(<Questionnaire userEmail="test@example.com" />);

    fireEvent.change(screen.getByTestId('businessName').querySelector('input'), { target: { value: 'Test Business' } });
    fireEvent.change(screen.getByTestId('industryType').querySelector('input'), { target: { value: 'Retail' } });
    fireEvent.change(screen.getByTestId('numEmployees').querySelector('input'), { target: { value: 10 } });
    fireEvent.change(screen.getByTestId('dailyVisitors').querySelector('input'), { target: { value: 50 } });
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByTestId('hasDetectionTech')).toBeInTheDocument();
    });
  });

  it('selects safety measures and sliders at Step 2 and moves to Step 3', async () => {
    render(<Questionnaire userEmail="test@example.com" />);

    // Fill Step 1
    fireEvent.change(screen.getByTestId('businessName').querySelector('input'), { target: { value: 'Test Business' } });
    fireEvent.change(screen.getByTestId('industryType').querySelector('input'), { target: { value: 'Retail' } });
    fireEvent.change(screen.getByTestId('numEmployees').querySelector('input'), { target: { value: 10 } });
    fireEvent.change(screen.getByTestId('dailyVisitors').querySelector('input'), { target: { value: 50 } });
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByTestId('hasDetectionTech')).toBeInTheDocument();
    });

    // Fill Step 2
    fireEvent.click(screen.getByLabelText('Yes'));
    const checkboxes = screen.getAllByTestId('checkbox-group');
    fireEvent.click(checkboxes[0]); // Select first checkbox (e.g., Surveillance cameras)

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByTestId('interestInAI')).toBeInTheDocument();
    });
  });

  it('fills Step 3 fields and submits the form', async () => {
    render(<Questionnaire userEmail="test@example.com" />);

    // Fill Step 1
    fireEvent.change(screen.getByTestId('businessName').querySelector('input'), { target: { value: 'Test Business' } });
    fireEvent.change(screen.getByTestId('industryType').querySelector('input'), { target: { value: 'Retail' } });
    fireEvent.change(screen.getByTestId('numEmployees').querySelector('input'), { target: { value: 10 } });
    fireEvent.change(screen.getByTestId('dailyVisitors').querySelector('input'), { target: { value: 50 } });
    fireEvent.click(screen.getByText('Next'));

    // Fill Step 2
    await waitFor(() => screen.getByTestId('hasDetectionTech'));
    fireEvent.click(screen.getByLabelText('Yes'));
    const checkboxes = screen.getAllByTestId('checkbox-group');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(screen.getByText('Next'));

    // Fill Step 3
    await waitFor(() => screen.getByTestId('interestInAI'));
    fireEvent.click(screen.getByLabelText('Yes, definitely'));

    fireEvent.change(screen.getByTestId('concerns').querySelector('textarea'), { target: { value: 'Privacy issues' } });
    fireEvent.change(screen.getByTestId('otherSuggestions').querySelector('textarea'), { target: { value: 'More drills' } });

    // Submit
    fireEvent.click(screen.getByText('Submit Questionnaire'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
