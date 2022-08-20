import React from "react";
import App from "./App";
import { render, fireEvent, waitFor } from "@testing-library/react";

test("should render App component", () => {
  const { getByText, getByTestId, debug } = render(<App />);
  expect(getByTestId("test-app")).toBeInTheDocument();
});

test("should App component in various mocked states", () => {
  // Arrange
  const mockUseState = jest.spyOn(React, "useState");
  mockUseState
    .mockImplementationOnce(() => [{}, jest.fn()])
    .mockImplementationOnce(() => ["testCountry", jest.fn()])
    .mockImplementationOnce(() => [true, jest.fn()]);
  const mockUseMemo = jest.spyOn(React, "useMemo");
  mockUseMemo.mockImplementationOnce(() => ({
    user: true,
    setUser: jest.fn(),
  }));
  const windowSpy = jest.spyOn(window, "open");

  // Act
  const { getByText, getByTestId, debug } = render(<App />);
  fireEvent.click(getByTestId("github-icon"));
  fireEvent.click(getByTestId("itch-icon"));
  fireEvent.click(getByTestId("coffee-icon"));

  console.log(getByTestId("coffee-icon").getAttribute(""));
  // Assert
  expect(getByTestId("test-app")).toBeInTheDocument();
  expect(getByTestId("github-icon")).toBeInTheDocument();
  expect(getByTestId("itch-icon")).toBeInTheDocument();
  expect(getByTestId("coffee-icon")).toBeInTheDocument();
  expect(windowSpy).toHaveBeenCalledTimes(3);
  // debug();
});
