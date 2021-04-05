import NavigationBar from "./NavigationBar";
import { render } from '@testing-library/react';
import { UserContext } from "../../UserContext";

test('should render and display a navigation bar on the screen', () => {
    const value = 'valid-User-For-Testing-Purposes';

    const { getByTestId } = render(
        <UserContext.Provider value={value}>
            <NavigationBar />
        </UserContext.Provider>
        );

    expect(getByTestId('test-navbar')).toBeInTheDocument();
})
