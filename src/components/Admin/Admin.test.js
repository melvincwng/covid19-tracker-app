import Admin from "./Admin";
import { render, fireEvent } from "@testing-library/react";
import { UserContext } from "../../UserContext";
import axios from "axios";
jest.mock("axios");

// To learn how to mock UserContext or Context in general, together with react testing library,
// Refer to https://polvara.me/posts/mocking-context-with-react-testing-library
test("should render and display the Admin component on the screen & simulate adding an article successfully", () => {
  const value = { user: true, setUser: jest.fn() };
  axios.post.mockImplementationOnce(() => ({
    status: 200,
    data: "New article data added to server/database",
  }));

  const { getByText, getByTestId, debug } = render(
    <UserContext.Provider value={value}>
      <Admin />
    </UserContext.Provider>
  );

  expect(getByText("Admin Features")).toBeInTheDocument();
  expect(getByText("Create new article:")).toBeInTheDocument();
  expect(getByTestId("for-form-testing")).toBeInTheDocument();
  fireEvent.submit(getByTestId("for-form-testing"));
  //debug();
});

test("should render and display the Admin component on the screen & simulate adding article failure", () => {
  const value = { user: true, setUser: jest.fn() };
  axios.post.mockImplementationOnce(() => {
    throw new Error("Failed to add article!");
  });
  const consoleSpy = jest.spyOn(console, "log");

  const { getByText, getByTestId, debug } = render(
    <UserContext.Provider value={value}>
      <Admin />
    </UserContext.Provider>
  );

  expect(getByText("Admin Features")).toBeInTheDocument();
  expect(getByText("Create new article:")).toBeInTheDocument();
  expect(getByTestId("for-form-testing")).toBeInTheDocument();
  fireEvent.submit(getByTestId("for-form-testing"));
  expect(consoleSpy).toHaveBeenCalled();
  //debug();
});
