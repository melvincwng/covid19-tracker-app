import axios from "axios";

const url = "https://covid19.mathdro.id/api";

// for Cards component
// As of 14/08/2021, I am using another API for Singapore's data: https://github.com/apify/covid-19 (https://github.com/apify/covid-19/tree/master/singapore)
// Hence you will realize the logic to extract & display Singapore's data is separated out from the rest of the world.

// Update - As of 11/09/2021, Apify Covid19 API is broken, hence I will revert back to using JHU CSSE API for Singapore's data
// The implementation for Apify Covid19 API will remain commented till that API is fixed...otherwise, data for SG will be obtained from JHU CSSE like the rest of the countries till further notice
export const fetchData = async (country) => {
  try {
    if (country === "Singapore") {
      // originally this is the implementation to obtain SG data via Apify Covid19 API
      // since that API has issues, we will revert back to JHU CSSE API

      // const response = await axios.get(
      //   "https://api.apify.com/v2/key-value-stores/yaPbKe9e5Et61bl7W/records/LATEST?disableRedirect=true"
      // );
      // const data = response.data;
      // const confirmed = { value: data.infected };
      // const recovered = { value: data.recovered };
      // const deaths = { value: data.deceased };
      // const lastUpdate = data.lastUpdatedAtApify;
      // return { confirmed, recovered, deaths, lastUpdate };

      // 11/09/2021 - Back to using JHU CSSE for Singpaore's data
      let changeableUrl = url;
      if (country) {
        changeableUrl = `${url}/countries/${country}`;
      }
      const response = await axios.get(changeableUrl);
      const data = response.data; // data is an object here
      const { confirmed, recovered, deaths, lastUpdate } = data;
      return { confirmed, recovered, deaths, lastUpdate };
    } else {
      let changeableUrl = url;
      if (country) {
        changeableUrl = `${url}/countries/${country}`;
      }
      const response = await axios.get(changeableUrl);
      const data = response.data; // data is an object here
      const { confirmed, recovered, deaths, lastUpdate } = data;
      return { confirmed, recovered, deaths, lastUpdate };
    }
  } catch (err) {
    console.log(err);
  }
};

// for Chart component
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`); //data is an array here
    // line 28-32 is returning an array with new objects containing the info confirmed, deaths, date
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

// for CountryPicker component
export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${url}/countries`);
    const countries_data = response.data; //countries_data will contain {countries: Array(192 countries)}
    const countries_array = countries_data.countries; //countries_arr will contain the array of countries
    return countries_array.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
