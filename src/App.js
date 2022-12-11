import React, { useState, useEffect, useMemo, Fragment } from "react";
import {
  fetchData,
  fetchGlobalDataViaBackupAPI,
  fetchCountryDataViaBackupAPI,
} from "./api/index";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import CovidHeaderImage from "./images/COVID19-header.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Extras from "./components/Extras/Extras";
import About from "./components/About/About";
import Articles from "./components/Articles/Articles";
import IndividualArticle from "./components/Articles/IndividualArticle";
import LoginForm from "./components/LoginForm/LoginForm";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import Logout from "./components/Logout/Logout";
import Admin from "./components/Admin/Admin";
import EditArticle from "./components/Articles/EditArticle";
import ToggleBetweenBarChartAndLineChart from "./components/ToggleBetweenBarChartAndLineChart/ToggleBetweenBarChartAndLineChart";
import Loader from "react-loader-spinner";
import { UserContext } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faItchIo } from "@fortawesome/free-brands-svg-icons";

export function openGithubLink() {
  window.open("https://github.com/melvincwng");
}

export function openItchLink() {
  window.open("https://melvinng.itch.io/");
}

export function openCoffeeLink() {
  window.open("https://www.buymeacoffee.com/melvincwng");
}

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartView, setChartView] = useState("Line Chart");

  //useMemo is a react hook which, when the variables user & setUser in the dependency array changes,
  //useMemo will automatically run again to return the new values of user & setUser in an object form
  //which will then update the 'value' constant/variable; 'value' constant stores the { user, setUser } object
  //which subsequently the new 'value' constant is passed into our UserContext component at the value attribute - line 60
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // useEffect will automatically run after the components here are first rendered onto the screen.
  useEffect(() => {
    async function fetchMyAPI() {
      let data_object = await fetchGlobalDataViaBackupAPI();
      // Check if data_object is empty or not, if its empty, it means first API call failed. Hence we call another backup API.
      if (Object.keys(data_object).length === 0) {
        data_object = await fetchData();
      }
      console.log("COVID-19 Global Data - ", data_object);
      setData(data_object); //setData(...) will re-render the App component again with the new data value
    }
    fetchMyAPI();
  }, []);

  // After logging in, and then refreshing the page or going to another section of the website,
  // the React states do not persist. This essentially means the user state (line 20) which should be
  // containing a valid user (since user has logged in) will be gone. Hence, upon refresh, the userContext disappears
  // To fix this, use the solution below (lines 46 - 59). We need to save the user state in localstorage & retrieve it on component load.
  // More information refer to: https://stackoverflow.com/questions/64668671/react-hooks-context-state-is-undefined-when-refreshing-the-page

  // Step 1. Create a key to name your data in local storage
  const USER_DATA_KEY_IN_LOCALSTORAGE = "user_data";

  // Step 2. Retrieve userData from local storage on startup
  // More information on window.localStorage, refer to: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  useEffect(() => {
    const userDataString = window.localStorage.getItem(
      USER_DATA_KEY_IN_LOCALSTORAGE
    ); //in this line, we are trying to get an item with the key USER_DATA_KEY in our local storage, but since our local storage doesn't have such an item, it will return null
    setUser(JSON.parse(userDataString)); // then at the start, we are actually doing setUser(null)
  }, []);

  // Step 3. Update userData in local storage when it changes (e.g. when we enter correct username/password & clicked Login -> in our LoginForm component, it will setUser(user), hence the user variable in app.js will contain an actual user object, and hence useEffect at line 54 will run again due to 'user' put being in its dependency array)
  useEffect(() => {
    window.localStorage.setItem(
      USER_DATA_KEY_IN_LOCALSTORAGE,
      JSON.stringify(user)
    );
  }, [user]);

  // Implementing logic for the handleSelectedCountry function here (for CountryPicker component)
  // What handleSelectedCountry does is that it takes into a parameter country
  // And then a) fetches the data for that specific country to b) update 1) cards component & 2) chart component
  async function handleSelectedCountry(country) {
    setIsLoading(true);
    let country_data_object = {};
    if (country) {
      // chartView state change to "Bar Chart" if we select a country
      setChartView("Bar Chart");
      country_data_object = await fetchCountryDataViaBackupAPI(country);
    } else {
      // chartView state change to "Line Chart" if we select "Global" (as Global can be represented by a line chart)
      setChartView("Line Chart");
      country_data_object = await fetchGlobalDataViaBackupAPI();
    }
    // Check if country_data_object is empty or not, if its empty, it means first API call failed. Hence we call another backup API.
    if (Object.keys(country_data_object).length === 0) {
      country_data_object = await fetchData(country);
    }
    setData(country_data_object);
    setCountry(country);
    setIsLoading(false);
  }

  // Implementing logic for the handleToggleChart function here (for ToggleBetweenBarChartAndLineChart component)
  // What handleToggleChart does is that it takes into a parameter 'chartView'
  // And then it toggles between the bar chart & line chart view
  async function handleToggleChart(chartView) {
    setChartView(chartView);
  }

  const atHomePage = window.location.pathname === "/";
  const atExtrasPage = window.location.pathname === "/extras";

  return (
    <div
      className={atExtrasPage ? styles.extrasContainer : styles.container}
      data-testid="test-app"
    >
      <BrowserRouter>
        <UserContext.Provider value={value}>
          {atHomePage && <NotificationBar />}
          <NavigationBar />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Fragment>
                  <img
                    src={CovidHeaderImage}
                    alt="COVID-19 Header"
                    className={styles.image}
                  ></img>
                  {isLoading ? (
                    <Loader
                      type="TailSpin"
                      color="black"
                      height={80}
                      width={80}
                    />
                  ) : (
                    <Cards
                      confirmed={data.confirmed}
                      recovered={data.recovered}
                      deaths={data.deaths}
                      lastUpdate={data.lastUpdate}
                      country={country}
                    />
                  )}
                  <CountryPicker
                    handleSelectedCountry={handleSelectedCountry}
                  />
                  {isLoading ? (
                    <Loader
                      type="TailSpin"
                      color="black"
                      height={80}
                      width={80}
                    />
                  ) : (
                    <Chart
                      confirmed={data.confirmed}
                      recovered={data.recovered}
                      deaths={data.deaths}
                      country={country}
                      chartView={chartView}
                    />
                  )}
                  {country && (
                    <ToggleBetweenBarChartAndLineChart
                      handleToggleChart={handleToggleChart}
                    />
                  )}
                  <footer className={styles.footer}>
                    *As of 4<sup>th</sup> Aug 2021,{" "}
                    <a
                      href="https://github.com/CSSEGISandData/COVID-19"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.fontColor}
                    >
                      Johns Hopkins University CSSE
                    </a>{" "}
                    is no longer collecting & maintaining certain COVID-19
                    related data. Hence, certain features of this web app may
                    not be available.
                    <br></br>
                    <b>
                      **Medical Disclaimer: All content & information on this
                      website is for informational/educational purposes only,
                      and does not constitute as medical advice.
                    </b>
                    <br></br>
                    <b>
                      **Always seek the advice of your own physician or other
                      qualified healthcare provider if you have questions
                      regarding any medical condition or treatment.
                    </b>
                    <hr className={styles.line}></hr>
                    <span>
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="2x"
                        className={styles.fontAwesome}
                        onClick={openGithubLink}
                        data-testid="github-icon"
                      />
                      <FontAwesomeIcon
                        icon={faItchIo}
                        size="2x"
                        className={styles.fontAwesome}
                        onClick={openItchLink}
                        data-testid="itch-icon"
                      />
                      <FontAwesomeIcon
                        icon={faCoffee}
                        size="2x"
                        className={styles.fontAwesomeNoMargin}
                        onClick={openCoffeeLink}
                        data-testid="coffee-icon"
                      />
                    </span>
                    <div>&copy; 2022 Melvin Ng</div>
                  </footer>
                </Fragment>
              )}
            />
            {user ? (
              <Route
                path="/login"
                exact
                render={() => <h1 className={styles.forbidden}>Logged in!</h1>}
              />
            ) : (
              <Route path="/login" exact component={LoginForm} />
            )}
            {user ? (
              <Route path="/logout" exact component={Logout} />
            ) : (
              <Route
                path="/logout"
                exact
                render={() => <h1 className={styles.forbidden}>Logged out!</h1>}
              />
            )}
            {user ? (
              <Route path="/admin" exact component={Admin} />
            ) : (
              <Route
                path="/admin"
                exact
                render={() => (
                  <h1 className={styles.forbidden}>
                    Error 401: You are not authorized to access this page
                  </h1>
                )}
              />
            )}
            <Route path="/articles" exact render={() => <Articles />} />
            <Route path="/articles/:id" exact component={IndividualArticle} />
            {user ? (
              <Route path="/edit/:id" exact component={EditArticle} />
            ) : (
              <Route
                path="/edit/:id"
                exact
                render={() => (
                  <h1 className={styles.forbidden}>
                    Error 401: You are not authorized to access this page
                  </h1>
                )}
              />
            )}
            <Route path="/about" exact component={() => <About />} />
            <Route path="/extras" exact component={() => <Extras />} />
            <Route
              render={() => (
                <h1 className={styles.forbidden}>Error 404: Page not found</h1>
              )}
            />
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
