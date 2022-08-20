import LoginForm from "./LoginForm";
import { render, fireEvent } from "@testing-library/react";
import { UserContext } from "../../UserContext";
import axios from "axios";
jest.mock("axios");

test("should render and display the LoginForm component on the screen, and simulate login succesfully", () => {
  const value = { user: true, setUser: jest.fn() };
  axios.post.mockImplementationOnce(() => ({
    status: 200,
    data: { 0: "You have logged in!", 1: { mockUser: "test user" } },
  }));

  const { getByTestId, debug } = render(
    <UserContext.Provider value={value}>
      <LoginForm />
    </UserContext.Provider>
  );

  expect(getByTestId("login-form")).toBeInTheDocument();
  fireEvent.submit(getByTestId("login-button"));
  //debug();
});
