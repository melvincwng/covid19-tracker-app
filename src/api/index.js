/**
 * As of 10/12/2022:
 * mathdroid/covid-19-api (fetchData/fetchDailyData/fetchCountries) --> API is down since 10/12/2022 (original primary API - reverted to backup API)
 * covid19api.com (fetchGlobalDataViaBackupAPI/fetchCountryDataViaBackupAPI/fetchDailyGlobalDataViaBackupAPI/fetchCountriesViaBackupAPI) --> API is up and running (backup API - now we are using this API as the "primary" API")
 */
import axios from "axios";

const primaryURL = "https://covid19.mathdro.id/api";
const backupURL = "https://api.covid19api.com";

// for Cards component - original primary API
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
export const fetchGlobalDataViaBackupAPI = async () => {
  try {
    let changeableURL = `${backupURL}/summary`;
    const response = await axios.get(changeableURL);
    const data = response.data || {}; // data is an object here
    const { TotalConfirmed, TotalDeaths, Date } = data.Global || {};
    // Formatting the data to match the format of the data from the primary API
    const confirmed = { value: TotalConfirmed };
    const deaths = { value: TotalDeaths };
    const lastUpdate = Date;
    return { confirmed, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
    // Return an object with undefined values if there is an error
    const confirmed = { value: undefined };
    const deaths = { value: undefined };
    const lastUpdate = undefined;
    return { confirmed, deaths, lastUpdate };
  }
};

// for Cards component - Backup API (To get Country specific COVID-19 data --> actually it will be used for Cards + Chart components)
export const fetchCountryDataViaBackupAPI = async (selectedCountry) => {
  try {
    // We can either use a) /summary endpoint OR b) /total/country/{country} endpoint
    // For a - it returns an object with a 'Countries' key --> and that key's value is an array of objects (one object containing each country's data)
    // For b - you would need to extract the last object from the array of objects returned, for the latest data)
    // Issue with Solution A - The /summary seems to be caching quite frequently, and when it caches, the .Countries key is not available. Hence means the /summary endpoint cannot be used when its caching.
    // A more stable approach is Solution B - /total/country/{country} endpoint (doesn't seem to cache...but we need to extract the last object in the array of objects returned from the API endpoint)
    let changeableURL = `${backupURL}/total/country/${selectedCountry}`;
    const response = await axios.get(changeableURL);
    const data = response.data || []; // data is an array here
    const selectedCountryLatestCovidData = data.pop();
    console.log(
      "What is the selected country's latest COVID-19 data:",
      selectedCountryLatestCovidData
    );
    // Formatting the data to match the format of the data from the primary API
    const { Confirmed, Deaths, Date } = selectedCountryLatestCovidData || {};
    const confirmed = { value: Confirmed };
    const deaths = { value: Deaths };
    const lastUpdate = Date;
    return { confirmed, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
    // Return an object with undefined values if there is an error
    const confirmed = { value: undefined };
    const deaths = { value: undefined };
    const lastUpdate = undefined;
    return { confirmed, deaths, lastUpdate };
  }
};

// for Chart component - original primary API
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${primaryURL}/daily`); //data is an array here
    // line 78-84 is returning an array with new objects containing the info confirmed, deaths, date
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

// for Chart component - Backup API (To get daily data for Global's line chart)
export const fetchDailyGlobalDataViaBackupAPI = async () => {
  try {
    const response = await axios.get(`${backupURL}/world`);
    const data = response.data || []; //data is an array here
    let sortedArrayByDate = data.sort((a, b) => {
      return new Date(a.Date) - new Date(b.Date);
    });
    // We will be returning an array with new objects containing the info confirmed, deaths, date (reference to primary API's daily data format - line 78-84 in this file)
    const modifiedData = sortedArrayByDate.map((dailyData) => ({
      confirmed: dailyData.TotalConfirmed,
      deaths: dailyData.TotalDeaths,
      date: dailyData.Date.slice(0, 10), //removing the time from the date string - e.g. 2022-12-11T00:00:00Z --> 2022-12-11
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// for Chart component - Backup API (To get daily data for individual country's line chart)
export const fetchDailyCountryDataViaBackupAPI = async (country) => {
  try {
    const response = await axios.get(
      `${backupURL}/total/dayone/country/${country}`
    );
    const data = response.data || []; //data is an array here
    let sortedArrayByDate = data.sort((a, b) => {
      return new Date(a.Date) - new Date(b.Date);
    });
    // We will be returning an array with new objects containing the info such as confirmed, deaths, date
    let modifiedData = sortedArrayByDate.map((dailyData) => ({
      confirmed: dailyData.Confirmed,
      deaths: dailyData.Deaths,
      date: dailyData.Date.slice(0, 10), //removing the time from the date string - e.g. 2022-12-11T00:00:00Z --> 2022-12-11
    }));

    modifiedData = modifiedData.length
      ? modifiedData
      : [
          {
            confirmed: undefined,
            deaths: undefined,
            date: undefined,
          },
        ];
    return modifiedData;
  } catch (err) {
    console.log(err);
    // Return an array with an object mapped to undefined values if there is an error
    return [
      {
        confirmed: undefined,
        deaths: undefined,
        date: undefined,
      },
    ];
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

// for CountryPicker component - Backup API (To get array of countries)
export const fetchCountriesViaBackupAPI = async () => {
  try {
    let changeableURL = `${backupURL}/countries`;
    const response = await axios.get(changeableURL);
    let countries_array = response.data || []; //countries_array OR response.data will straightaway contain an array of country objects - e.g. [ {"Country": "Senegal"...}, {"Country": "Serbia"...}, ... ]
    // Sort the countries_array alphabetically since the API doesn't return the countries in alphabetical order
    countries_array.sort((a, b) => {
      if (a.Country < b.Country) return -1;
      if (a.Country > b.Country) return 1;
      return 0;
    });
    return countries_array.map((country) => country.Country); // Return an array of sorted country names
  } catch (err) {
    console.log(err);
    return [];
  }
};
