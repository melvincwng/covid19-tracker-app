import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Cards.module.css';

function Chart ({ confirmed, recovered, deaths, country }) {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        async function fetchMyAPI() {
            let daily_data_array = await fetchDailyData();
            setDailyData(daily_data_array);
        }
        fetchMyAPI();
    }, []);

    return (

    );





}
