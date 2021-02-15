import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards/Cards';
import { fetchData } from './api/index';
import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState({});
  const fetchedData = fetchData();

  useEffect(() => 
      setData({ data: fetchedData })
  );
  
  // testing purposes
  return (
    <div className="App"> 
      <Cards 
        confirmed={{value: 19000}}
        recovered={{value: 9000}}
        deaths={{value: 9000}}
        lastUpdate="22-05-2020"
        country="Singapore"
        />
    </div>
  );
}

export default App;
