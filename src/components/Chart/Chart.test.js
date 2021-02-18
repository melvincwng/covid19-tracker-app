import Chart from './Chart';
import { render } from '@testing-library/react';

test('should render and display a chart on the screen', () => {
    const { getByTestId } = render(
        <Chart 
        confirmed={{value:100}}
        recovered={{value:70}}
        deaths={{value:20}}
        country="test country"
        />
        );
    expect(getByTestId('testing-chart')).toBeInTheDocument();
  })

