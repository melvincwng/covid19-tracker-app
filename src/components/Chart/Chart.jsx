import React, { useState, useEffect } from "react";
import {
  fetchDailyData,
  fetchDailyGlobalDataViaBackupAPI,
  fetchDailyCountryDataViaBackupAPI,
} from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import Loader from "react-loader-spinner";

function Chart({ confirmed, recovered, deaths, country, chartView }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    async function fetchMyAPIForLineChart() {
      let daily_data_array = [];

      if (!country) {
        // On initial load, we are loading "Global", hence country === "". Thus we will fetch the global daily data to generate line-chart.
        daily_data_array = await fetchDailyGlobalDataViaBackupAPI();
      } else {
        // If country is not empty, it means that we are loading a specific country. Hence, we will fetch the country daily data to generate line-chart.
        daily_data_array = await fetchDailyCountryDataViaBackupAPI(country);
      }

      // Check if daily_data_array is empty. If it is, it means that the first API call failed. Hence, we will try using a second API backup API call.
      if (daily_data_array.length === 0) {
        daily_data_array = await fetchDailyData();
      }

      console.log(
        "What is the daily data array for line_chart? - ",
        daily_data_array
      );

      setDailyData(daily_data_array);
    }

    chartView === "Line Chart" && fetchMyAPIForLineChart();
  }, [country, chartView]);

  // Visit react-chart-js on github to view and get a sense of how they implement their graphs
  // Can see their source codes on how they implemented their line or bar charts.
  const line_data = {
    labels: dailyData.map((dailyData) => dailyData.date),
    datasets: [
      {
        label: "Infected",
        data: dailyData.map((dailyData) => dailyData.confirmed),
        fill: true,
        borderColor: "rgb(0, 0, 255)",
      },
      {
        label: "Deaths",
        data: dailyData.map((dailyData) => dailyData.deaths),
        fill: true,
        backgroundColor: "rgba(255, 75, 100, 0.5)",
        borderColor: "rgb(255, 0, 0)",
      },
    ],
  };

  const line_options = {
    scales: {
      yAxes: [
        {
          ticks: {
            userCallback: function (value, index, values) {
              return value.toLocaleString(); // this helps to add commas to y-axis
            },
            fontFamily: "Pangolin",
          },
        },
      ],
      xAxes: [{ ticks: { fontFamily: "Pangolin" } }],
    },

    //According to chartjs official docs, "the label callback can change the text that displays on the
    // screen for a given data point". In this case, this section is code is applicable since I wish
    // to format the number displayed in each tooltip to contain the comma separator every 3 digits.
    // the 'data' parameter in line 58 actually refers to line_data (try to understand the logic)
    // cause later on, in line 59, we will use line_data to access the datasets key/property
    // line_data.datasets is actually an array containing two objects (1 obj at index 0, 1 obj at index 1)
    // the object at index 0 of the array aka line_data.datasets[0] will have many tooltips,
    // each individually attached to a datapoint in data (line_data.datasets[0].data).
    // This is the same logic for the object at index 1 of the array line_data.datasets
    // hence tooltipItem.datasetIndex means what is its dataset index of the tooltipItem (see below)
    // aka does the tooltip item belong to dataset index 0 (line_data.datasets[0]) or dataset index 1 (line_data.datasets[1])
    // then subsequently once we know whether the tooltipItem's datasetIndex is 0 or 1 then
    // we access the data property which is a mapped array with many values where...
    // each tooltipItem will be assigned an individual value in this mapped array and hence have an index
    // hence in line 73 where we ...data[tooltipItem.index] => we will get tooltipValue
    // to grab the label in line 72 is the same logic as above & .toLocaleString() helps to format a number with commas.

    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label;
          let tooltipValue =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return `${label}: ${tooltipValue.toLocaleString()}`;
        },
      },
    },

    legend: {
      labels: {
        fontFamily: "Pangolin",
      },
    },
  };

  // the variable const bar_data (line 60 - 91) has been causing me a lot of bugs
  // Long story short when the Chart component is first rendered, data is an empty object
  // hence data.confirmed will be undefined and undefined is being passed in as props to Charts component
  // which you cannot get the value property of an undefined item
  // That is what the error kept saying cannot read value property of undefined
  // hence to fix this, have to use ternary operator (see logic below)

  const bar_data = confirmed
    ? {
        labels: ["Infected", "Recovered*", "Active*", "Deaths"],
        datasets: [
          {
            label: "People",
            data: [
              confirmed.value, // this was the part causing errors (line 64)
              0, // originally this line was 'recovered.value' but since JHU CSSE is no longer maintaining recovered/active data, this was removed & changed to 0
              0, // originally this line was 'confirmed.value - recovered.value - deaths.value' but since JHU CSSE is no longer maintaining recovered/active data, this was removed & changed to 0
              deaths.value,
            ],
            backgroundColor: [
              "rgba(0, 0, 255, 0.6)",
              "rgba(0, 255, 0, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(255, 0, 0, 0.6)",
            ],
            borderColor: [
              "rgba(0, 0, 255, 1)",
              "rgba(0, 255, 0, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 0, 0, 1)",
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
              "rgba(0, 80, 160)",
              "rgba(30, 100, 50)",
              "rgba(200, 150, 0)",
              "rgba(255, 50, 50)",
            ],
          },
        ],
      }
    : null; // this should fix the bug

  // this options variable is for the bar-charts
  // can refer to https://www.chartjs.org/docs/latest/configuration/title.html for more info:
  const bar_options = {
    title: {
      display: true,
      text: `Current situation in ${country}`,
      fontFamily: "Pangolin",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            userCallback: function (value, index, values) {
              return value.toLocaleString(); // this helps to convert the add commas to y-axis
            },
            fontFamily: "Pangolin",
          },
        },
      ],
      xAxes: [{ ticks: { fontFamily: "Pangolin" } }],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          // data parameter refers to bar_data
          let label = data.datasets[tooltipItem.datasetIndex].label;
          let tooltipValue =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return `${label}: ${tooltipValue.toLocaleString()}`;
        },
      },
    },
    legend: {
      labels: {
        fontFamily: "Pangolin",
      },
    },
  };

  const lineChart = dailyData.length ? (
    <Line data={line_data} options={line_options}></Line>
  ) : (
    <Loader type="TailSpin" color="black" height={80} width={80} />
  );

  // Generate bar chart if confirmed is not an empty object (aka confirmed = {value: some-num, type: example})
  const barChart = confirmed ? (
    <Bar data={bar_data} options={bar_options}></Bar>
  ) : (
    <Loader type="TailSpin" color="black" height={80} width={80} />
  );

  return (
    <div className={styles.container} data-testid="testing-chart">
      {country && chartView === "Bar Chart"
        ? barChart
        : country && chartView === "Line Chart"
        ? lineChart
        : !country
        ? lineChart
        : null}
    </div>
  );
}

export default Chart;
