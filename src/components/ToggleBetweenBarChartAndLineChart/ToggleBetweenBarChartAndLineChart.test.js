import ToggleBetweenBarChartAndLineChart from "./ToggleBetweenBarChartAndLineChart";
import { render } from "@testing-library/react";

test("It should just render and display a notification bar on the screen", () => {
  const { getByTestId } = render(<ToggleBetweenBarChartAndLineChart />);
  expect(getByTestId("toggle-bar")).toBeInTheDocument();
});
