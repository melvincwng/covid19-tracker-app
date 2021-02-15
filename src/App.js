import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards/Cards';
import { fetchData } from './api/index';
import React, { useState, useEffect } from "react";
import styles from './components/Cards/Cards.module.css';

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      let data_obj = await fetchData();
      setData(data_obj)
    }
    fetchMyAPI()
  },[])

  // testing purposes
  return (
    <div className="App"> 
      <Cards 
        confirmed={data.confirmed}
        recovered={data.recovered}
        deaths={data.deaths}
        lastUpdate={data.lastUpdate}
        country={country}
        />
    </div>
  );
}

export default App;
