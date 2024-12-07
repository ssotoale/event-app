import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "./login"; // Adjust import if necessary
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter instead of Router for testing
import { loginUser } from './login'; // Import loginUser from login.jsx

const setLoggedInMock = jest.fn();

// Mock the loginUser function from login.jsx
jest.mock('./login', () => ({
  loginUser: jest.fn(), // Mock the loginUser function
}));

describe("Login Component", () => {
  test("renders the login form", () => {
    render(
      <MemoryRouter>
        <Login setLoggedIn={setLoggedInMock} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Enter your username here")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password here")).toBeInTheDocument();
  });

  test("shows error message when username or password is empty", async () => {
    render(
      <MemoryRouter>
        <Login setLoggedIn={setLoggedInMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/log in/i));

    await waitFor(() => {
      expect(screen.getByText(/Username is required./)).toBeInTheDocument();
      expect(screen.getByText(/Password is required./)).toBeInTheDocument();
    });
  });

  test("calls loginUser function and navigates on successful login", async () => {
    const mockResponse = { token: "mock-token" };
    loginUser.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <Login setLoggedIn={setLoggedInMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username here"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password here"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/log in/i));

    await waitFor(() => {
      expect(setLoggedInMock).toHaveBeenCalledWith(true);
    });
  });

  test("displays a network error if login fails", async () => {
    const mockError = new Error("Network Error");
    loginUser.mockRejectedValue(mockError);

    render(
      <MemoryRouter>
        <Login setLoggedIn={setLoggedInMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username here"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password here"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/log in/i));

    await waitFor(() => {
      expect(screen.getByText("Network Error: Network Error")).toBeInTheDocument();
    });
  });
});
