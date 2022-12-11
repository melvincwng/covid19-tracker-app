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
      >
        <option id="bar-chart" value="Bar Chart">
          Bar Chart
        </option>
        <option id="line-chart" value="Line Chart">
          Line Chart
        </option>
      </select>
    </div>
  );
}

export default ToggleBetweenBarChartAndLineChart;
