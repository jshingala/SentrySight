import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionnaireAdmin from '../../src/Questionnaire-Admin'; // adjust path if needed

beforeEach(() => {
  jest.useFakeTimers(); // Tells Jest not to wait real time
});

afterEach(() => {
  jest.runOnlyPendingTimers(); //  Clears fake timers
  jest.useRealTimers();
});


describe('QuestionnaireAdmin', () => {
  test('displays loading spinner initially', () => {
    render(<QuestionnaireAdmin />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

   test('opens email modal on row click', async () => {
    render(<QuestionnaireAdmin />);
    jest.advanceTimersByTime(1000);

    const row = await screen.findByText('Tech Solutions');
    fireEvent.click(row);

    expect(screen.getByText('Send Email to Tech Solutions')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toHaveValue("Follow-up on Tech Solutions's Submission");
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });


  test('opens email modal on row click', async () => {
    render(<QuestionnaireAdmin />);
  
    // 👇 This must come before trying to find anything that renders after delay
    jest.advanceTimersByTime(1000);
  
    // 👇 Now we wait for the actual data to appear
    const row = await screen.findByText('Tech Solutions');
    fireEvent.click(row);
  
    expect(screen.getByText('Send Email to Tech Solutions')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toHaveValue("Follow-up on Tech Solutions's Submission");
  });
  
  

  test('closes modal on Cancel click', async () => {
    render(<QuestionnaireAdmin />);
  
    // 👇 This is essential to simulate the 1-second data load delay
    jest.advanceTimersByTime(1000);
  
    // Wait for data to load
    const row = await screen.findByText('Mall Mart');
    fireEvent.click(row);
  
    const cancelBtn = await screen.findByText('Cancel');
    fireEvent.click(cancelBtn);
  
    await waitFor(() => {
      expect(screen.queryByText('Send Email to Mall Mart')).not.toBeInTheDocument();
    });
  });
  
});
