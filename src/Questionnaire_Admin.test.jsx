// Questionnaire_Admin.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Questionnaire_Admin from "./Questionnaire_Admin";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        companies: [
          { business_name: "Alpha Inc", email: "alpha@example.com", submit_date: "2024-01-01T12:00:00Z" },
          { business_name: "Beta LLC", email: "beta@example.com", submit_date: "2023-06-15T08:30:00Z" }
        ],
        totalCompanies: 2
      }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (setClientEmail = jest.fn()) => {
  render(
    <BrowserRouter>
      <Questionnaire_Admin setClientEmail={setClientEmail} />
    </BrowserRouter>
  );
};

test("renders loading spinner initially", () => {
  renderComponent();
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

test("renders companies after fetch", async () => {
  renderComponent();

  expect(await screen.findByText("Alpha Inc")).toBeInTheDocument();
  expect(screen.getByText("Beta LLC")).toBeInTheDocument();
});

// test("navigates on company click", async () => {
//   const mockSetClientEmail = jest.fn();
//   renderComponent(mockSetClientEmail);

//   const companyRow = await screen.findByText("Alpha Inc");
//   fireEvent.click(companyRow);

//   expect(mockSetClientEmail).toHaveBeenCalledWith("alpha@example.com");
// });

test("filters companies by search term", async () => {
  renderComponent();

  await screen.findByText("Alpha Inc");

  const searchInput = screen.getByPlaceholderText("Search by Company Name");
  fireEvent.change(searchInput, { target: { value: "Beta" } });

  expect(await screen.findByText("Beta LLC")).toBeInTheDocument();
  expect(screen.queryByText("Alpha Inc")).not.toBeInTheDocument();
});

test("shows 'No companies found' if no match", async () => {
  renderComponent();

  await screen.findByText("Alpha Inc");

  const searchInput = screen.getByPlaceholderText("Search by Company Name");
  fireEvent.change(searchInput, { target: { value: "Nonexistent" } });

  expect(await screen.findByText("No companies found")).toBeInTheDocument();
});