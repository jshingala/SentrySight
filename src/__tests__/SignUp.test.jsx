import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../SignUp";
import '@testing-library/jest-dom';

describe("Register Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.includes('/send-verification-code')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ code: '123456' })
        });
      }
      if (url.includes('/verify-code')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        });
      }
      if (url.includes('/sign-up')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        });
      }
      return Promise.reject(new Error('Unknown API call'));
    });
  });

  test("renders the sign-up form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign Up \/ Register/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number:/i)).toBeInTheDocument();
  });

  test("updates form fields correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: "SecurePassword123" } });
    fireEvent.change(screen.getByLabelText(/Business Name:/i), { target: { value: "Test Business" } });
    fireEvent.change(screen.getByLabelText(/Contact Number:/i), { target: { value: "(123)456-7890" } });

    expect(screen.getByLabelText(/Email:/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/Password:/i)).toHaveValue("SecurePassword123");
    expect(screen.getByLabelText(/Business Name:/i)).toHaveValue("Test Business");
    expect(screen.getByLabelText(/Contact Number:/i)).toHaveValue("(123)456-7890");
  });

  test("sends verification code on form submit", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Enter the verification code sent to your email:/i)).toBeInTheDocument();
    });
  });

  test("handles verification code submission", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText(/Enter verification code/i), { target: { value: "123456" } });
      fireEvent.click(screen.getByText(/Verify Code/i));'
    });

    await waitFor(() => {
        expect(screen.queryByText((content) => 
          content.includes("registered") || content.includes("success")
        )).toBeInTheDocument();
      });      
  });

  test("renders success message after registration", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Verify Code/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/You're successfully registered!/i)).toBeInTheDocument();
    });
  });
});