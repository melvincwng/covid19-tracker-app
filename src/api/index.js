import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

// for Cards component
export const fetchData = async (country) => {
    try {
        let changeableUrl = url;
        if (country) {
            changeableUrl = `${url}/countries/${country}`;
        }
        const response = await axios.get(changeableUrl);
        const data = response.data; // data is an object here
        const { confirmed, recovered, deaths, lastUpdate } = data;
        
        return  { confirmed, recovered, deaths, lastUpdate };

    } catch (err) {
        console.log(err)
    }
};

// for Chart component
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`) //data is an array here
        // line 29-33 is returning an array with new objects containing the info confirmed, deaths, date
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

    } catch (err) {
        console.log(err)
    }
};

// for CountryPicker component
export const fetchCountries = async () => {
    try {
        const { countries } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name);

    } catch (err) {
        console.log(err)
    }
};