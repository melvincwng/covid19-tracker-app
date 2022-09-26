import EditArticle from "./EditArticle";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("should render and display the EditArticle component on the screen", () => {
  const value = "valid-User-For-Testing-Purposes";

  const individualArticleData = {
    title: "Test Article",
    body: "This is an article made for testing purposes",
    authorName: "Test Author - Jim",
  };
  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render the EditArticle component & simulate submission of article edits", async () => {
    mockAxios
      .onGet(
        `${process.env.REACT_APP_BACKEND_API_URL}/articles/605ad60b78d1010015f1337f`
      )
      .reply(200, individualArticleData);

    const { getByTestId } = render(
      <UserContext.Provider value={value}>
        <EditArticle match={{ params: { id: "605ad60b78d1010015f1337f" } }} />
      </UserContext.Provider>
    );

    await waitFor(() => getByTestId("edit-article-form"));
    await waitFor(() => getByTestId("edit-title"));
    await waitFor(() => getByTestId("edit-body"));
    await waitFor(() => getByTestId("edit-author-name"));
    fireEvent.submit(getByTestId("edit-article-form"));
    fireEvent.change(getByTestId("edit-title"), {
      target: { value: "testData" },
    });
    fireEvent.change(getByTestId("edit-body"), {
      target: { value: "testData" },
    });
    fireEvent.change(getByTestId("edit-author-name"), {
      target: { value: "testData" },
    });
    expect(getByTestId("edit-article-form")).toBeInTheDocument();
  });
});
