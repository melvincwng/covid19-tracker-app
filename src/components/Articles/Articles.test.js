import Articles from "./Articles";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("Articles component", () => {
  const articlesData = [
    {
      title: "Test Article",
      body: "This is an article made for testing purposes",
      authorName: "Test Author - Jim",
    },
  ];

  beforeEach(() => {
    mockAxios.reset();
  });

  const value = { user: true, setUser: jest.fn() };

  it("should render the Articles component", async () => {
    mockAxios
      .onGet("https://covid19-tracker-app-express.herokuapp.com/articles")
      .reply(200, articlesData);

    const { getByText } = render(
      <UserContext.Provider value={value}>
        <Articles />
      </UserContext.Provider>
    );

    await waitFor(() => getByText("Test Article"));

    expect(getByText("Test Article")).toBeInTheDocument();
    expect(
      getByText("This is an article made for testing purposes")
    ).toBeInTheDocument();
    expect(getByText("Test Author - Jim")).toBeInTheDocument();
    expect(getByText("Read more")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
    fireEvent.click(getByText("Delete"));
  });
});
