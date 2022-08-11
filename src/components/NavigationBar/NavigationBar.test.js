import NavigationBar from "./NavigationBar";
import { render } from "@testing-library/react";
import { UserContext } from "../../UserContext";

test("If user is not logged in, it should just render and display a navigation bar on the screen", () => {
  const value = "null-User-For-Testing-Purposes";

  const { getByTestId } = render(
    <UserContext.Provider value={value}>
      <NavigationBar />
    </UserContext.Provider>
  );

  expect(getByTestId("test-navbar")).toBeInTheDocument();
});

test("If user is logged in, it should render and display a navigation bar on the screen with 'Logout' & 'Admin' text", () => {
  const value = { user: true, setUser: jest.fn() };

  const { getByTestId } = render(
    <UserContext.Provider value={value}>
      <NavigationBar />
    </UserContext.Provider>
  );

  expect(getByTestId("test-navbar")).toBeInTheDocument();
  expect(getByTestId("test-navbar").textContent).toContain("Logout");
  expect(getByTestId("test-navbar").textContent).toContain("Admin");
});
