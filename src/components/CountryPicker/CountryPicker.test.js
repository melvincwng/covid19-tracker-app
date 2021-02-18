import CountryPicker from './CountryPicker';
import { render } from '@testing-library/react';

test('should display a dropdown bar with Global', () => {
    const { getByText } = render(<CountryPicker/>);
    expect(getByText("Global")).toBeInTheDocument();
  })

