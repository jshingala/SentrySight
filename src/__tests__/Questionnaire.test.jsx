import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Questionnaire from '../Questionnaire';
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('Questionnaire Component', () => {
  const userEmail = 'test@example.com';

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders form fields correctly', () => {
    render(<Questionnaire userEmail={userEmail} />);
    
    expect(screen.getByLabelText(/Business Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Industry Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Employees/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Daily Visitors/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Do you currently have firearm detection technology/i)).toBeInTheDocument();
    expect(screen.getByText(/Safety Measures in Place/i)).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<Questionnaire userEmail={userEmail} />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Business name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Industry type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Number of employees is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Daily visitors is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Selection is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<Questionnaire userEmail={userEmail} />);
    
    fireEvent.change(screen.getByLabelText(/Business Name/i), { target: { value: 'ABC Corp' } });
    fireEvent.change(screen.getByLabelText(/Industry Type/i), { target: { value: 'Retail' } });
    fireEvent.change(screen.getByLabelText(/Number of Employees/i), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText(/Daily Visitors/i), { target: { value: '100' } });

    // Select option from dropdown
    fireEvent.mouseDown(screen.getByLabelText(/Do you currently have firearm detection technology/i));
    fireEvent.click(screen.getByText('Yes'));

    // Check a checkbox
    fireEvent.click(screen.getByLabelText(/Surveillance cameras/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3306/questionnaire', expect.any(Object));
    });
  });

  test("alerts when user is not logged in", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    render(<Questionnaire userEmail={null} />);
  
    // Fill out the required fields
    fireEvent.change(screen.getByLabelText(/Business Name/i), {
      target: { value: "Test Business" },
    });
    fireEvent.change(screen.getByLabelText(/Industry Type/i), {
      target: { value: "Retail" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Employees/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Daily Visitors/i), {
      target: { value: "200" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/Do you currently have firearm detection technology/i));
    fireEvent.click(screen.getByText('Yes'));

    // Check at least one safety measure checkbox
    fireEvent.click(screen.getByLabelText(/Surveillance cameras/i));
  
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Please login to submit your questionnaire");
    });
  
    alertMock.mockRestore();
  });  
});
