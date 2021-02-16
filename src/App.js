import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards/Cards';
import { fetchData } from './api/index';
import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  // useEffect will automatically run after the components here are first rendered onto the screen.
  useEffect(() => {
    async function fetchMyAPI() {
      let data_object = await fetchData();
      setData(data_object)
    }
    fetchMyAPI()
  },[])

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
