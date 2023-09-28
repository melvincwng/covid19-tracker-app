# COVID-19 Tracker App

This web application showcases various COVID-19 related statistics such as number of infections, number of recoveries, number of active cases and numbers of deaths, both globally and locally (within Singapore). 

It also provides access to medical articles about COVID-19, which users can read to increase their awareness & knowledge about the disease.

## Table of Contents
  * [Languages/Tools](#Languages/Tools)
  * [Libraries & APIs](#Libraries)
  * [Art & Design](#Art)
  * [Live Demo](#Demo)
  * [Run Application Locally](#Local)
  * [Contribution Guidelines](#Contribution)

## Languages/Tools used: <a name="Languages/Tools"/>
HTML, CSS, Javascript, MERN stack (MongoDB, Express, React, Node.js)

## Libraries & APIs used: <a name="Libraries"/>
Libraries: Material UI, Bootstrap, react-countup, react-chartjs-2, Formik, react-loader-spinner

APIs used: 
  - melvincwng/covid19-tracker-app-express

## Art & Design: <a name="Art"/>
Artwork created by Melvin Ng

## Live Demo:  <a name="Demo"/>
https://covid19-sg.netlify.app/

<img src="https://github.com/melvincwng/covid19-tracker-app/blob/master/src/images/demo.JPG"/>

## Run Application Locally <a name="Local"/>
Here are the steps to install and run this web application locally:

1. Create a fork of this repository
2. Clone the repository locally
3. Navigate a terminal to the cloned repository and run `npm install`
  * This command will install all of the dependencies
4. Using GitBash on Windows, run the following command:
  * `export NODE_OPTIONS=--openssl-legacy-provider`
  * Later versions of Nodejs do not work with webpack, but this command fixes the issue
5. Run the command `npm run start`
6. The application should automatically open after running this command
  * If it doesn't, it can be found at localhost:3000

Known Issue with Running Locally:
* Running the program locally will cause the Articles tab to create an error
* This issue does not exist when using the live demo

## Contribution Guidelines <a name="Contribution"/>
* If you would like to contribute to this project, please fork the project
* Once you have a fork, make changes to that fork and make a pull request
