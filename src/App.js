import React, { useState, useEffect, useMemo, Fragment } from "react";
import { fetchData } from './api/index';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import CovidHeaderImage from './images/COVID19-header.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './components/NavigationBar/NavigationBar'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from './components/About/About';
import Articles from './components/Articles/Articles';
import IndividualArticle from './components/Articles/IndividualArticle';
import LoginForm from './components/LoginForm/LoginForm';
import { UserContext } from './UserContext';
import Logout from './components/Logout/Logout'; 
import Admin from './components/Admin/Admin';
import EditArticle from './components/Articles/EditArticle';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [ user, setUser ] = useState(null);
  
  //useMemo is a react hook which, when the variables user & setUser in the dependency array changes,
  //useMemo will automatically run again to return the new values of user & setUser in an object form
  //which will then update the 'value' constant/variable; 'value' constant stores the { user, setUser } object
  //which subsequently the new 'value' constant is passed into our UserContext component at the value attribute - line 60
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // useEffect will automatically run after the components here are first rendered onto the screen.
  useEffect(() => {
    async function fetchMyAPI() {
      const data_object = await fetchData();
      setData(data_object) //setData(...) will re-render the App component again with the new data value
    }
    fetchMyAPI()
  },[])

  // After logging in, and then refreshing the page or going to another section of the website,
  // the React states do not persist. This essentially means the user state (line 20) which should be
  // containing a valid user (since user has logged in) will be gone. Hence, upon refresh, the userContext disappears
  // To fix this, use the solution below (lines 46 - 59). We need to save the user state in localstorage & retrieve it on component load.
  // More information refer to: https://stackoverflow.com/questions/64668671/react-hooks-context-state-is-undefined-when-refreshing-the-page
  
  // Step 1. Create a key to name your data in local storage
  const USER_DATA_KEY_IN_LOCALSTORAGE = 'user_data';

  // Step 2. Retrieve userData from local storage on startup
  // More information on window.localStorage, refer to: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  useEffect(() => {
    const userDataString = window.localStorage.getItem(USER_DATA_KEY_IN_LOCALSTORAGE); //in this line, we are trying to get an item with the key USER_DATA_KEY in our local storage, but since our local storage doesn't have such an item, it will return null
    setUser(JSON.parse(userDataString)); // then at the start, we are actually doing setUser(null)
  }, []);

  // Step 3. Update userData in local storage when it changes (e.g. when we enter correct username/password & clicked Login -> in our LoginForm component, it will setUser(user), hence the user variable in app.js will contain an actual user object, and hence useEffect at line 54 will run again due to 'user' put being in its dependency array)
  useEffect(() => {
    window.localStorage.setItem(USER_DATA_KEY_IN_LOCALSTORAGE, JSON.stringify(user));
  }, [user]);

  //implementing logic for the handleSelectedCountry function here
  //what handleSelectedCountry does is that it takes into a parameter country
  //and then a) fetches the data for that specific country to b) update 1) cards component & 2) chart component
  async function handleSelectedCountry(country) {
    const country_data_object = await fetchData(country);
    setData(country_data_object);
    setCountry(country);
  }

  return (
    <div className={styles.container} data-testid="test-app">
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <NavigationBar />
          <Switch>
            <Route path="/" exact render={() =>
              <Fragment>
                <img src={CovidHeaderImage} alt="COVID-19 Header" className={styles.image} ></img>
                <Cards confirmed={data.confirmed} recovered={data.recovered} deaths={data.deaths} lastUpdate={data.lastUpdate} country={country} />
                <CountryPicker handleSelectedCountry={handleSelectedCountry}/>
                <Chart confirmed={data.confirmed} recovered={data.recovered} deaths={data.deaths} country={country}/>
              </Fragment>
            } />
            {user ? <Route path="/login" exact render={() => <h1 className={styles.forbidden}>Logged in!</h1>} /> :  <Route path="/login" exact component={LoginForm} />}
            {user ? <Route path="/logout" exact component={Logout} /> : <Route path="/logout" exact render={() => <h1 className={styles.forbidden}>Logged out!</h1>} />}
            {user ? <Route path="/admin" exact component={Admin} /> : <Route path="/admin" exact render={() => <h1 className={styles.forbidden}>Error 401: You are not authorized to access this page</h1>} />}
            <Route path="/articles" exact render={() => <Articles />} />
            <Route path="/articles/:id" exact component={IndividualArticle} />
            { user ? <Route path="/edit/:id" exact component={EditArticle} /> : <Route path="/edit/:id" exact render={() => <h1 className={styles.forbidden}>Error 401: You are not authorized to access this page</h1>} /> }
            <Route path="/about" exact component={() => <About />} />
            <Route render={() => <h1 className={styles.forbidden}>Error 404: Page not found</h1>} /> 
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App; 

// Notes:
// Line 74 - <Fragment></Fragment> component can be used to help render multiple components
// Refer to: https://stackoverflow.com/questions/37342997/render-multiple-components-in-react-router for more info

// Line 89 - <Route render={() => <h1 className={styles.forbidden}>Error 404: Page not found</h1>} />;
// If you put all the Route components in a Switch component,
// and if the 'path' attribute for the route component is not stated (line 89)
// When no other matches above are found, the path will always match that particular Route component (line 89)
// Refer to: https://ultimatecourses.com/blog/react-router-not-found-component for more info