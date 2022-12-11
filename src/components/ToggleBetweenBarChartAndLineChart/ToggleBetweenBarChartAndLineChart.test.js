import ToggleBetweenBarChartAndLineChart from "./ToggleBetweenBarChartAndLineChart";
import { render, fireEvent } from "@testing-library/react";

test("It should just render and display a toggle bar on the screen", () => {
  const mockHandleToggleChart = jest.fn();
  const { getByTestId } = render(
    <ToggleBetweenBarChartAndLineChart
      handleToggleChart={mockHandleToggleChart}
    />
  );
  expect(getByTestId("toggle-bar")).toBeInTheDocument();
});

test("It should toggle from 'Bar Chart' to 'Line Chart' on the screen", () => {
  const mockHandleToggleChart = jest.fn();
  const { getByTestId } = render(
    <ToggleBetweenBarChartAndLineChart
      handleToggleChart={mockHandleToggleChart}
    />
  );
  fireEvent.change(getByTestId("chart-select"), {
    target: { value: "Line Chart" },
  });
  expect(getByTestId("toggle-bar")).toBeInTheDocument();
  expect(getByTestId("line-chart")).toBeInTheDocument();
});
