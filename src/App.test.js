/** (LINES 107-108 or CLTRL F 'FullReactRouterDOM')
 * Import the whole 'react-router-dom' package as an object and alias it as FullReactRouterDOM (we need this obj for jest.spyOn)
 * <MemoryRouter with initialEntries=['/login']></MemoryRouter> is supposed to render your component at that respective route (in this case LoginForm)
 * However, there was an issue whereby we cannot navigate to the path/component (aka /login) using MemoryRouter while testing/debug()
 * Summarized reason:
    Problem:
      - App.js we are using <BrowserRouter></BrowserRouter> && in App.test.js we are using <MemoryRouter></MemoryRouter>
      - Hence, this means that we will have 2 routers (one on top of the other) when rendering the App component in tests (i.e. something like <MemoryRouter><BrowserRouter></BrowserRouter></MemoryRouter>)
      - Probably having two routers will cause issues in the routing & hence rendering of the correct component (i.e. /login component in this case)
    Solution:
      - Mock <BrowserRouter></BrowserRouter> in App.js & "Convert" into a <MemoryRouter></MemoryRouter> in the tests
      - Hence, now we have only one router, and we can add the initialEntries array containing our paths --> and the test should work
    References:
      1) https://plainenglish.io/blog/testing-react-router-with-jest
      2) https://stackoverflow.com/questions/59892304/cant-get-memoryrouter-to-work-with-testing-library-react
      3) https://stackoverflow.com/questions/51031761/how-to-mock-browserrouter-of-react-router-dom-using-jest

  * Additional Notes One: mockImplementationOnce() for 'user' state doesn't seem to be working to set "truthy" values?
  * Maybe can consider other methods - e.g. mockImplementation() or research other ways to mock state in the future?
  * Only try to fix if got time in the future - Take note I commented out some imports/imported components, because mock 'user' state to true is not working
  * Hence, no point using those imports --> as they won't be able to be rendered until the mock user state to true issue get resolved (now is false user state by default)
  * 
  * Additional Notes Two: From what I've read from a technical blog on unit testing, here are my understandings:
  * For App.js:
  *   - The point of the unit tests here are to test whether you can render the App component, 
  *   - and subsequently go to a subsequent route & see whether that specific component will load (e.g. go to / --> Navbar/Cards/CountryPicker/Charts component should show)
  *   - The contents of those components - e.g. Navbar/Cards/CountryPicker/Chart doesn't matter (even if show loading status - e.g. for Cards, it's initial render shows 'Loading data...')
  *   - Why so? Because the contents of the individual component will and should be subsequently tested in the individual component's unit test (e.g. Cards component --> test its content/behavior in Cards.test.jsx)
  *   - Reference: https://plainenglish.io/blog/testing-react-router-with-jest
  *   - Quoted frm the ref above: 'Unit tests for routing requests to desired components shouldn't test or depend on the content of the components. That's a separate behavior that should be tested in the unit tests of each individual component.'
  * 
  * Additional Notes Three: 
  * If you encounter this error 'TypeError: Cannot read properties of undefined (reading '0')' --> checked on SOF many times, but unable to resolve this issue from online documentation/references
  * Eventually self-discovered the solution: In the 'Arrange' phase (Recall Arrange, Act, Assert), need to mockImplementationOnce() all the different useState hooks (should have 3 in App.js I think)
  * Basically need to "set up" the environment ready for the component to be tested during unit testing
  * Yes, even though only managed to set up "falsey" values for the various useState hooks, and cannot set up "truthy" values (see Additional Notes One)
  * It doesn't mean it's useless... because if you were to remove this "falsely" state values setup environment, these unit tests will break...
  * Hence, this falsely values setup env in the 'Arrange' phase is important!
  * 
 */

import React from "react";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./components/LoginForm/LoginForm";
import Articles from "./components/Articles/Articles";
import IndividualArticle from "./components/Articles/IndividualArticle";
import About from "./components/About/About";
import Extras from "./components/Extras/Extras";
// import Logout from "./components/Logout/Logout";
// import Admin from "./components/Admin/Admin";
// import EditArticle from "./components/Articles/EditArticle";

import FullReactRouterDOM, { MemoryRouter } from "react-router-dom";
jest.mock("./components/LoginForm/LoginForm");
jest.mock("./components/Articles/Articles");
jest.mock("./components/Articles/IndividualArticle");
jest.mock("./components/About/About");
jest.mock("./components/Extras/Extras");
// jest.mock("./components/Logout/Logout");
// jest.mock("./components/Admin/Admin");
// jest.mock("./components/Articles/EditArticle");

describe("App component", () => {
  it("should render App component", () => {
    const { getByText, getByTestId, debug } = render(<App />);
    expect(getByTestId("test-app")).toBeInTheDocument();
    // debug();
  });

  it("should render Homepage component in various mocked states", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    const windowSpy = jest.spyOn(window, "open");

    // Act
    const { getByText, getByTestId, debug } = render(<App />);
    fireEvent.click(getByTestId("github-icon"));
    fireEvent.click(getByTestId("itch-icon"));
    fireEvent.click(getByTestId("coffee-icon"));

    // Assert
    expect(getByTestId("test-app")).toBeInTheDocument();
    expect(getByTestId("github-icon")).toBeInTheDocument();
    expect(getByTestId("itch-icon")).toBeInTheDocument();
    expect(getByTestId("coffee-icon")).toBeInTheDocument();
    expect(windowSpy).toHaveBeenCalledTimes(3);
    // debug();
  });

  it("should render the LoginForm component if route='/login'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/login"]}>{children}</MemoryRouter>
      ));
    LoginForm.mockImplementation(() => <div>LoginPageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("LoginPageMock")).toBeInTheDocument();
    //debug();
  });

  it("should not render the Logout component if route='/logout' & user is not logged in", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/logout"]}>{children}</MemoryRouter>
      ));
    // Logout.mockImplementation(() => <div>LogoutPageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("Logged out!")).toBeInTheDocument();
    // expect(getByText("LogoutPageMock")).toBeInTheDocument();
    // debug();
  });

  it("should not render the Admin page if route='/admin' & user is not logged in", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/admin"]}>{children}</MemoryRouter>
      ));
    // Admin.mockImplementation(() => <div>AdminPageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(
      getByText("Error 401: You are not authorized to access this page")
    ).toBeInTheDocument();
    // expect(getByText("AdminPageMock")).toBeInTheDocument();
    // debug();
  });

  it("should render the Articles page if route='/articles'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/articles"]}>{children}</MemoryRouter>
      ));
    Articles.mockImplementation(() => <div>ArticlesPageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("ArticlesPageMock")).toBeInTheDocument();
    // debug();
  });

  it("should render the IndividualArticle component if route='/articles/:id'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/articles/testID123"]}>
          {children}
        </MemoryRouter>
      ));
    IndividualArticle.mockImplementation(() => (
      <div>IndividualArticlePageMock</div>
    ));

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("IndividualArticlePageMock")).toBeInTheDocument();
    // debug();
  });

  it("should not render the EditArticle page if user is not logged in & route='/edit/testRandomID123'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/edit/testRandomID123"]}>
          {children}
        </MemoryRouter>
      ));
    //EditArticle.mockImplementation(() => <div>EditArticlePageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(
      getByText("Error 401: You are not authorized to access this page")
    ).toBeInTheDocument();
    // expect(getByText("EditArticlePageMock")).toBeInTheDocument();
    // debug();
  });

  it("should render the About page if route='/about'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
      ));
    About.mockImplementation(() => <div>AboutPageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("AboutPageMock")).toBeInTheDocument();
    // debug();
  });

  it("should render the About page if route='/extras'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/extras"]}>{children}</MemoryRouter>
      ));
    Extras.mockImplementation(() => <div>ExtrasPageMock</div>);

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("ExtrasPageMock")).toBeInTheDocument();
    // debug();
  });

  it("should render the Error 404 page if route='/aRandomAndInvalidRoute'", () => {
    // Arrange
    const mockUseState = jest.spyOn(React, "useState");
    mockUseState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => ["testCountry", jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
    const mockUseMemo = jest.spyOn(React, "useMemo");
    mockUseMemo.mockImplementationOnce(() => ({
      user: false,
      setUser: jest.fn(),
    }));
    jest
      .spyOn(FullReactRouterDOM, "BrowserRouter")
      .mockImplementation(({ children }) => (
        <MemoryRouter initialEntries={["/aRandomAndInvalidRoute"]}>
          {children}
        </MemoryRouter>
      ));

    // Act
    const { debug, getByText } = render(<App />);

    // Assert
    expect(getByText("Error 404: Page not found")).toBeInTheDocument();
    // debug();
  });
});
