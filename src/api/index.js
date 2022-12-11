import axios from "axios";

const primaryURL = "https://covid19.mathdro.id/api";
const backupURL = "https://api.covid19api.com/summary";

// for Cards component
export const fetchData = async (country) => {
  try {
    let changeableURL = primaryURL;
    if (country) {
      changeableURL = `${primaryURL}/countries/${country}`;
    }
    const response = await axios.get(changeableURL);
    const data = response.data; // data is an object here
    const { confirmed, recovered, deaths, lastUpdate } = data;
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
    return {};
  }
};

// for Cards component - Backup API (To get Global COVID-19 data)
export const fetchDataViaBackupAPI = async () => {
  try {
    const response = await axios.get(backupURL);
    const data = response.data; // data is an object here
    const { TotalConfirmed, TotalDeaths, Date } = data.Global;
    // Formatting the data to match the format of the data from the primary API
    const confirmed = { value: TotalConfirmed };
    const deaths = { value: TotalDeaths };
    const lastUpdate = Date;
    return { confirmed, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
    return {};
  }
};

// for Chart component
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${primaryURL}/daily`); //data is an array here
    // line 28-32 is returning an array with new objects containing the info confirmed, deaths, date
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// for CountryPicker component
export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${primaryURL}/countries`);
    const countries_data = response.data; //countries_data will contain {countries: Array(192 countries)}
    const countries_array = countries_data.countries; //countries_arr will contain the array of countries
    return countries_array.map((country) => country.name);
  } catch (err) {
    console.log(err);
    return [];
  }
};
