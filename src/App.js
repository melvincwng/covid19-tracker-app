import React, { useState, useEffect } from "react";
import { fetchData } from './api/index';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import CovidHeaderImage from './images/COVID19-header.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './components/NavigationBar/NavigationBar'
import { BrowserRouter, Route } from "react-router-dom";
import About from './components/About/About';
import Articles from './components/Articles/Articles';
import IndividualArticle from './components/Articles/IndividualArticle';

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
      <BrowserRouter>
        <NavigationBar />
        <Route path="/" exact render={() => <img src={CovidHeaderImage} alt="COVID-19 Header" className={styles.image} ></img>} />
        <Route path="/" exact render={() => <Cards confirmed={data.confirmed} recovered={data.recovered} deaths={data.deaths} lastUpdate={data.lastUpdate} country={country} />} />
        <Route path="/" exact render={() => <CountryPicker handleSelectedCountry={handleSelectedCountry}/>} />
        <Route path="/" exact render={() => <Chart confirmed={data.confirmed} recovered={data.recovered} deaths={data.deaths} country={country}/>} />
        <Route path="/login" exact render={() => <h1>Login</h1>} />
        <Route path="/articles" exact render={() => <Articles />} />
        <Route path="/articles/:id" exact component={IndividualArticle} />
        <Route path="/about" exact component={() => <About />} />
      </BrowserRouter>
    </div>
  );
}

export default App; 
