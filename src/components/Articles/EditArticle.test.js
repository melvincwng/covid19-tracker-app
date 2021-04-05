import EditArticle from './EditArticle';
import { render, waitFor } from '@testing-library/react';
import { UserContext } from "../../UserContext";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("should render and display the EditArticle component on the screen", () => {
    const value = 'valid-User-For-Testing-Purposes';

    const individualArticleData = 
        {
            title: "Test Article",
            body: "This is an article made for testing purposes",
            authorName: "Test Author - Jim",
        }
    ;
  
    beforeEach(() => {
      mockAxios.reset();
    });
    
    it("should render the EditArticle component", async () => {
        
        mockAxios
            .onGet("https://covid19-tracker-app-express.herokuapp.com/articles/605ad60b78d1010015f1337f")
            .reply(200, individualArticleData);
        
            const { getByTestId } = render(
                <UserContext.Provider value={value}>
                    <EditArticle match={{ params: {id: "605ad60b78d1010015f1337f"} }}/>
                </UserContext.Provider>
            );
  
        await waitFor(() => getByTestId("edit-article-form"));

        expect(getByTestId('edit-article-form')).toBeInTheDocument();
        
    });

});
