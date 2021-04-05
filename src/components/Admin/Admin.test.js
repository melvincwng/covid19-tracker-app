import Admin from "./Admin";
import { render } from '@testing-library/react';
import { UserContext } from "../../UserContext";

// To learn how to mock UserContext or Context in general, together with react testing library,
// Refer to https://polvara.me/posts/mocking-context-with-react-testing-library
test('should render and display the Admin component on the screen', () => {
    const value = 'valid-User-For-Testing-Purposes';

    const { getByText, getByTestId } = render(
        <UserContext.Provider value={value}>
            <Admin />
        </UserContext.Provider>
        );

    expect(getByText('Admin Features')).toBeInTheDocument();
    expect(getByText('Create new article:')).toBeInTheDocument();
    expect(getByTestId('for-form-testing')).toBeInTheDocument();
})