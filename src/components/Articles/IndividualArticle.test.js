import IndividualArticle from "./IndividualArticle";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("IndividualArticle component", () => {
  const individualArticleData = {
    title: "Test Article",
    body: "This is an article made for testing purposes",
    authorName: "Test Author - Jim",
    articleImage: "https://www.mockImage.com",
  };

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render the IndividualArticle component", async () => {
    mockAxios
      .onGet(
        "https://covid19-tracker-app-express.herokuapp.com/articles/605ad60b78d1010015f1337f"
      )
      .reply(200, individualArticleData);

    const { getByText } = render(
      <IndividualArticle
        match={{ params: { id: "605ad60b78d1010015f1337f" } }}
      />
    ); //to simulate props.match.params.id in IndividualArticle.jsx

    await waitFor(() => getByText("Test Article"));

    expect(getByText("Test Article")).toBeInTheDocument();
    expect(
      getByText("This is an article made for testing purposes")
    ).toBeInTheDocument();
    expect(getByText("Test Author - Jim")).toBeInTheDocument();
  });

  it("should throw an error for the IndividualArticle component", async () => {
    mockAxios
      .onGet(
        "https://covid19-tracker-app-express.herokuapp.com/articles/605ad60b78d1010015f1337f"
      )
      .reply(200, null);

    const { getByText } = render(
      <IndividualArticle
        match={{ params: { id: "605ad60b78d1010015f1337f" } }}
      />
    ); //to simulate props.match.params.id in IndividualArticle.jsx

    await waitFor(() => getByText("Error 404: Page not found"));
    expect(getByText("Error 404: Page not found")).toBeInTheDocument();
  });
});
