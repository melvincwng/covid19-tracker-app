import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

function Chart ({ confirmed, recovered, deaths, country }) {

    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        async function fetchMyAPI() {
            let daily_data_array = await fetchDailyData();
            setDailyData(daily_data_array);
        }
        fetchMyAPI();
    }, []);

    // Visit react-chart-js on github to view and get a sense of how they implement their graphs
    // Can see their source codes on how they implemented their line or bar charts.
    const line_data = {
        labels: dailyData.map((dailyData) => dailyData.date),
        datasets: [
            {
                label: 'Infected',
                data: dailyData.map((dailyData) => (dailyData.confirmed)),
                fill: true,
                borderColor:'rgb(0, 0, 255)'
            },
            {
                label: 'Deaths',
                data: dailyData.map((dailyData) => (dailyData.deaths)),
                fill: true,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor:'rgb(255, 0, 0)'
            },
        ],
    }

    const line_options = {
        scales: {
          yAxes: [
            {
                ticks: {
                    userCallback: function(value, index, values) {
                        return value.toLocaleString();   // this helps to add commas to y-axis
                    }
                }
            },
          ],
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
                    let label = data.datasets[tooltipItem.datasetIndex].label
                    let tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return `${label}: ${tooltipValue.toLocaleString()}`; 
                }
              }
            },
      };
    
    // the variable const bar_data (line 60 - 91) has been causing me a lot of bugs
    // Long story short when the Chart component is first rendered, data is an empty object
    // hence data.confirmed will be undefined and undefined is being passed in as props to Charts component
    // which you cannot get the value property of an undefined item 
    // That is what the error kept saying cannot read value property of undefined
    // hence to fix this, have to use ternary operator (see logic below)

    const bar_data = confirmed ? {
        labels: ["Infected", "Recovered", "Active", "Deaths"],
        datasets: [
            {
                label: "People",
                data: [
                    confirmed.value, // this was the part causing errors (line 64)
                    recovered.value, 
                    confirmed.value - recovered.value - deaths.value, 
                    deaths.value
                ],
                backgroundColor: [
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(0, 255, 0, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 0, 0, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 0, 0, 1)'
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(0, 80, 160)',
                    'rgba(30, 100, 50)',
                    'rgba(200, 150, 0)',
                    'rgba(255, 50, 50)'
                ], 
            },
        ],
    } : null // this should fix the bug

    // this options variable is for the bar-charts
    // can refer to https://www.chartjs.org/docs/latest/configuration/title.html for more info:
    const bar_options = {
        title: { display: true, text: `Current situation in ${country}`},
        scales: {
            yAxes: [
              {
                  ticks: {
                      userCallback: function(value, index, values) {
                          return value.toLocaleString();   // this helps to convert the add commas to y-axis
                      }
                  }
              },
            ],
          },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {  // data parameter refers to bar_data
                    let label = data.datasets[tooltipItem.datasetIndex].label
                    let tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return `${label}: ${tooltipValue.toLocaleString()}`;
                }
              }
            },
    }

    const lineChart = dailyData.length ? <Line data={line_data} options={line_options}></Line> : null;
    const barChart = confirmed ? <Bar data={bar_data} options={bar_options}></Bar>: null; 
    // generate bar chart if confirmed is not an empty object (aka like {value: some-num, type: example})
    
    return (
        <div className={styles.container}>{ country ? barChart : lineChart }</div>
    );
}

export default Chart;