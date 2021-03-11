import React, { useState, useEffect } from "react";
import { fetchData } from './api/index';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import CovidHeaderImage from './images/COVID19-header.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './components/NavigationBar/NavigationBar'

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  // useEffect will automatically run after the components here are first rendered onto the screen.
  useEffect(() => {
    async function fetchMyAPI() {
      const data_object = await fetchData();
      setData(data_object) //setData(...) will re-render the App component again with the new data value
    }
    fetchMyAPI()
  },[])

  //implementing logic for the handleSelectedCountry function here
  //what handleSelectedCountry does is that it takes into a parameter country
  //and then a) fetches the data for that specific country to b) update 1) cards component & 2) chart component
  async function handleSelectedCountry(country) {
    const country_data_object = await fetchData(country);
    setData(country_data_object);
    setCountry(country);
  }

  return (
    <div className={styles.container}>
      <NavigationBar />
      <img src={CovidHeaderImage} alt="COVID-19 Header" className={styles.image} ></img>
      <Cards 
        confirmed={data.confirmed}
        recovered={data.recovered}
        deaths={data.deaths}
        lastUpdate={data.lastUpdate}
        country={country}
        />
      <CountryPicker handleSelectedCountry={handleSelectedCountry}/> 
      <Chart 
        confirmed={data.confirmed}
        recovered={data.recovered}
        deaths={data.deaths}
        country={country}
        />
    </div>
  );
}

export default App; 
