import Chart from './Chart';
import { render } from '@testing-library/react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("Chart component", () => {
  //chartData is the response.data which we will get after the request
  const chartData = [
    {
      confirmed: {total: 100},
      deaths: {total: 50},
      reportDate: "2020-01-22"
    },
  ]

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render the Chart component", async () => {
    mockAxios
      .onGet("https://covid19.mathdro.id/api/daily")
      .reply(200, chartData);

    const { getByTestId } = render(<Chart />);

    expect(getByTestId("testing-chart")).toBeInTheDocument();
  });
});

// Old tests below:
/*test('should render and display a bar-chart on the screen', () => {
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

  test('should render and display a line-chart on the screen', () => {
    const { getByTestId } = render(
        <Chart 
        confirmed={{value:100}}
        recovered={{value:70}}
        deaths={{value:20}}
        />
        );
    expect(getByTestId('testing-chart')).toBeInTheDocument();
  })
*/

