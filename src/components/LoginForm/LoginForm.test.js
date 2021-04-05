import LoginForm from './LoginForm';
import { render } from '@testing-library/react';
import { UserContext } from "../../UserContext";

test('should render and display the LoginForm component on the screen', () => {
    const value = 'valid-User-For-Testing-Purposes'; 

    const { getByTestId } = render(
        <UserContext.Provider value={value}>
            <LoginForm />
        </UserContext.Provider>
    );

    expect(getByTestId('login-form')).toBeInTheDocument();

})
