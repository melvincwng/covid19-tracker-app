import Logout from './Logout';
import { render } from '@testing-library/react';
import { UserContext } from "../../UserContext";

test('should render and display the Logout component on the screen', () => {
    const value = 'valid-User-For-Testing-Purposes'; 

    const { getByTestId } = render(
        <UserContext.Provider value={value}>
            <Logout />
        </UserContext.Provider>
    );

    expect(getByTestId('logout-form')).toBeInTheDocument();

})
