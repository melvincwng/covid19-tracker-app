import App from './App';
import { render } from '@testing-library/react';

test("should render & display various components of App", () => {
  const value = 'valid-User-For-Testing-Purposes';
  const { getByTestId } = render(<App />);
  expect(getByTestId('test-app')).toBeInTheDocument();
});
  