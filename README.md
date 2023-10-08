# COVID-19 Tracker App

A web application designed to address the spread of health misinformation during the COVID-19 pandemic and beyond by showcasing various COVID-19 related statistics and resources. Only by making this information, including affected cases and medical articles, more available to the public will there be an increase in knowledge and awareness about this critical disease.

## Features
1. A homepage with the most recent updates on the number of infections, recoveries, active cases, and deaths, as related to COVID-19 from a global and local perspective (within Singapore).
2. Sign in page for users
3. A collection of medical articles related to COVID-19
4. A chart and table expressing the data for vaccination against COVID-19 per country across a period of time

## Languages/Tools used
HTML, CSS, Javascript, MERN stack (MongoDB, Express, React, Node.js)

## Libraries & APIs used
Libraries: Material UI, Bootstrap, react-countup, react-chartjs-2, Formik, react-loader-spinner

APIs used: 
  - melvincwng/covid19-tracker-app-express

## Installation
1. Clone this repository
```
   git clone https://github.com/melvincwng/covid19-tracker-app
```
2. Navigate to the project directory
```
   cd covid19-tracker-app
```
3. Install the required dependencies
```
   npm install
```
4. Start the application on the local server
```
   npm start
```

## Project Structure 
Listed below is a simplified folder structure to help understand the project's fundamental directories & files:
```bash
src/
├── api/
├── components/
│   ├── About/
│   ├── Admin/
│   ├── Articles/
│   ├── Cards/
│   ├── Chart/
│   ├── CountryPicker
│   ├── Extras/
│   └── LoginForm/
│   ├── Logout/
│   └── NavigationBar/
│   ├── NotificationBar/
│   └── ToggleBetweenBarChartAndLineChart/
├── App.js
└── index.js
```

### api/
A collection of files containing COVID-19 related data gathered from various APIs to post onto the website.

### components/
- `About` - Retrieves data regarding the purpose of COVID-19 Tracker App and advice on how to analyze information given
- `Admin` - Handles permissions only given to program administrator to add new articles to database
- `Articles` - Retrieves articles from database to display in collection of resources
- `Cards` - Responsible for making the individual cards on the Home page showing the type of cases related to COVID-19 (infected, recorded, active, and deaths)
- `CountryPicker` - Handles the adding of countries by accessing an API to see their corresponding COVID-19 data on the chart and table
- `Extras` - Determines total functionality of chart and table displaying vaccination data
- `LoginForm` - Responsible for login logic
- `Logout` - Responsible for logout logic
- `NavigationBar` - Manages navigation bar functionality with Home, Login, Articles, About, and Extras tabs
- `NotificationBar` - Alerts users of any updates that would affect the current data presented
- `ToggleBetweenBarChartAndLineChart` - Allows users to switch between a bar chart or line chart format to display data of different types of cases

### App.js
Responsible for combining the functionality of all components of the web application

### index.js
Calls upon App.js to run the application and acquire the primary content

## Art & Design
Artwork created by Melvin Ng

## Live Demo
https://covid19-sg.netlify.app/

<img src="https://github.com/melvincwng/covid19-tracker-app/blob/master/src/images/demo.JPG"/>

## Contributing
Any contributions you make are greatly appreciated. If you have a suggestion that would make this better, please fork the repo and create a pull request.  

1. Fork this repository:  https://github.com/melvincwng/covid19-tracker-app/fork 
2. Create a new branch
3. Commit your changes and push to the new branch
4. Open a Pull Request toward the original repository

