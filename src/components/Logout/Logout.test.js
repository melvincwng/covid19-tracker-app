// How to mock axios calls: https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/
import Logout from "./Logout";
import { render, fireEvent } from "@testing-library/react";
import { UserContext } from "../../UserContext";
import axios from "axios";
jest.mock("axios");

// Happy path
test("should render and display the Logout component on the screen, and logout successfully", () => {
  const value = { user: true, setUser: jest.fn() };
  axios.post.mockImplementationOnce(() => ({
    status: 200,
    data: "You have logged out!",
  }));

  const { getByTestId, debug } = render(
    <UserContext.Provider value={value}>
      <Logout />
    </UserContext.Provider>
  );

  expect(getByTestId("logout-form")).toBeInTheDocument();
  fireEvent.click(getByTestId("logout-button"));
  //debug();
});

// Unhappy path
test("should render and display the Logout component on the screen, but fail to logout due to error", () => {
  const value = { user: true, setUser: jest.fn() };
  axios.post.mockImplementationOnce(() => {
    throw new Error("An error has occurred during logout!");
  });

  const { getByTestId, debug } = render(
    <UserContext.Provider value={value}>
      <Logout />
    </UserContext.Provider>
  );
  const consoleSpy = jest.spyOn(console, "log");

  expect(getByTestId("logout-form")).toBeInTheDocument();
  fireEvent.click(getByTestId("logout-button"));
  expect(consoleSpy).toHaveBeenCalled();
  //debug();
});
