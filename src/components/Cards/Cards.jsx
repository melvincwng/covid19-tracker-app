import React from "react";
import styles from "./Cards.module.css";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

function Cards({ confirmed, recovered, deaths, lastUpdate, country }) {
  // At the start, the app will render a component with empty/undefined values
  if (!confirmed) {
    return "Loading data...";
  } else {
    // As of 04/08/2021, John Hopkins University is no longer maintaining the data for 'recovered',
    // and 'active'. Source: https://github.com/CSSEGISandData/COVID-19/issues/4465
    // Hence line 14 is commented out as a result...
    // const active = confirmed.value - recovered.value - deaths.value;
    let cardDetails = [
      {
        style: styles.infected,
        text: "Infected",
        value: confirmed.value,
        bottomText: "Number of infected cases from COVID-19",
      },
      {
        style: styles.recovered,
        text: "Recovered*",
        value: 0,
        bottomText: "Number of recovered cases from COVID-19",
      },
      {
        style: styles.active,
        text: "Active*",
        value: 0,
        bottomText: "Number of active cases of COVID-19",
      },
      {
        style: styles.deaths,
        text: "Deaths",
        value: deaths.value,
        bottomText: "Number of deaths from COVID-19",
      },
    ];

    // add ternary operator/condition here so that if cardDetail.value is true => render an actual card with countup feature
    // else if cardDetail.value == false (0) => render a actual with a '-' sign
    return (
      <div className={styles.container}>
        <Grid container spacing={3} justify="center">
          {cardDetails.map((cardDetail, idx) =>
            cardDetail.value ? (
              <Grid
                item
                component={Card}
                xs={12}
                md={2}
                className={cardDetail.style}
                style={{ margin: "0px 23.675px", padding: "12px" }}
                key={idx}
              >
                <CardContent>
                  <Typography
                    color="textPrimary"
                    className={styles.font}
                    gutterBottom
                  >
                    <b>{cardDetail.text}</b>
                  </Typography>
                  <Typography variant="h5" className={styles.font}>
                    <CountUp
                      start={0}
                      end={cardDetail.value}
                      duration={2}
                      separator=","
                    />
                  </Typography>
                  <Typography color="textPrimary" className={styles.font}>
                    Last Updated at :{" "}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    className={styles.font}
                  >
                    {new Date(lastUpdate).toDateString()}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    className={styles.font}
                  >
                    {new Date(lastUpdate).toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" className={styles.font}>
                    {cardDetail.bottomText}
                  </Typography>
                  <Typography color="textPrimary" className={styles.font}>
                    {" "}
                    {country}{" "}
                  </Typography>
                </CardContent>
              </Grid>
            ) : (
              <Grid
                item
                component={Card}
                xs={12}
                md={2}
                className={cardDetail.style}
                style={{ margin: "0px 23.675px", padding: "12px" }}
                key={idx}
              >
                <CardContent>
                  <Typography
                    color="textPrimary"
                    className={styles.font}
                    gutterBottom
                  >
                    <b>{cardDetail.text}</b>
                  </Typography>
                  <Typography variant="h5" className={styles.font}>
                    -
                  </Typography>
                  <Typography color="textPrimary" className={styles.font}>
                    Last Updated at :{" "}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    className={styles.font}
                  >
                    {new Date(lastUpdate).toDateString()}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    className={styles.font}
                  >
                    {new Date(lastUpdate).toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" className={styles.font}>
                    {cardDetail.bottomText}
                  </Typography>
                  <Typography color="textPrimary" className={styles.font}>
                    {" "}
                    {country}{" "}
                  </Typography>
                </CardContent>
              </Grid>
            )
          )}
        </Grid>
      </div>
    );
  }
}

export default Cards;
