import React from "react";
import styles from "./ToggleBetweenBarChartAndLineChart.module.css";

function ToggleBetweenBarChartAndLineChart({ handleToggleChart }) {
  return (
    <div className={styles.toggleBar} data-testid="toggle-bar">
      <label htmlFor="chart">Toggle View:</label>
      &nbsp; &nbsp;
      <select
        id="chart"
        name="chart"
        onChange={(e) => handleToggleChart(e.target.value)}
        data-testid="chart-select"
      >
        <option id="bar-chart" value="Bar Chart" data-testid="bar-chart">
          Bar Chart
        </option>
        <option id="line-chart" value="Line Chart" data-testid="line-chart">
          Line Chart
        </option>
      </select>
    </div>
  );
}

export default ToggleBetweenBarChartAndLineChart;
