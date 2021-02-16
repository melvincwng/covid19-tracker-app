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
    
    const bar_data = {
        labels: ["Infected", "Recovered", "Active", "Deaths"],
        datasets: [
            {
                label: "People",
                data: [
                    confirmed.value, 
                    recovered.value, 
                    confirmed.value - recovered.value - deaths.value , 
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
    }

    // this options variable is for the bar-charts
    // can refer to https://www.chartjs.org/docs/latest/configuration/title.html for more info:
    const options = {
        title: { display: true, text: `Current situation in ${country}`}
    }

    const lineChart = dailyData.length ? <Line data={line_data}></Line> : null;
    const barChart = country ? <Bar data={bar_data} options={options}></Bar>: null;

    return (
        <div className={styles.container}>{ country ? barChart : lineChart }</div>
    );
}

export default Chart;