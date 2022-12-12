import Chart from "./Chart";
import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
const mockAxios = new MockAdapter(axios);

describe("Chart component", () => {
  //chartData is the response.data which we will get after the request
  const chartData = [
    {
      confirmed: { total: 100 },
      deaths: { total: 50 },
      date: "2020-01-22",
    },
  ];

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

  it("should render the Chart component again but containing a line chart (Global Data)", () => {
    mockAxios.onGet("https://api.covid19api.com/world").reply(200, chartData);
    const props = {
      confirmed: { value: 50 },
      deaths: { value: 10 },
      country: undefined,
    };

    const { getByTestId } = render(<Chart {...props} />);

    expect(getByTestId("testing-chart")).toBeInTheDocument();
  });

  it("should render the Chart component again but containing a bar chart (For Specific Country)", () => {
    mockAxios
      .onGet("https://api.covid19api.com/total/dayone/country/Malaysia")
      .reply(200, chartData);
    const props = {
      confirmed: { value: 50 },
      deaths: { value: 10 },
      country: "Malaysia",
      chartView: "Bar Chart",
    };

    const { getByTestId } = render(<Chart {...props} />);

    expect(getByTestId("testing-chart")).toBeInTheDocument();
  });

  it("should render the Chart component again but containing a line chart (For Specific Country)", () => {
    mockAxios
      .onGet("https://api.covid19api.com/total/dayone/country/Malaysia")
      .reply(200, chartData);
    const props = {
      confirmed: { value: 50 },
      deaths: { value: 10 },
      country: "Malaysia",
      chartView: "Line Chart",
    };

    const { getByTestId } = render(<Chart {...props} />);

    expect(getByTestId("testing-chart")).toBeInTheDocument();
  });
});
