import React from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cn from "classnames";

function Cards ({ confirmed, recovered, deaths, lastUpdate, country }) {
    // if no confirmed cases, return the following
    if (!confirmed) {
        return "No confirmed cases";
    } else {
        const active = confirmed.value - recovered.value - deaths.value;
        let cardDetails = [
            {
                style: styles.infected,
                text: "Infected",
                value: confirmed.value,
                bottomText: "Number of infected cases from COVID-19"
            },
            {
                style: styles.recovered,
                text: "Recovered",
                value: recovered.value,
                bottomText: "Number of recovered cases from COVID-19"
            },
            {
                style: styles.active,
                text: "Active",
                value: active,
                bottomText: "Number of active cases of COVID-19"
            },
            {
                style: styles.deaths,
                text: "Deaths",
                value: deaths.value,
                bottomText: "Number of deaths from COVID-19"
            } 
        ];

        return (
            <div className={styles.container}>
                <Grid container spacing={3} justify="center">
                    {cardDetails.map((cardDetail) => (
                        <Grid
                        item
                        component={Card}
                        xs={12}
                        md={2}
                        className={cn(styles.Card, cardDetail.style)}
                        style={{ margin: "0px 23.675px", padding: "12px" }}
                      >
                          <CardContent>
                            <Typography color="textPrimary" gutterBottom>
                                <b>{cardDetail.text}</b>
                            </Typography>
                            <Typography variant="h5">
                                <CountUp
                                start={0}
                                end={cardDetail.value}
                                duration={2}
                                separator=","
                                />
                            </Typography>
                            <Typography color="textPrimary">Last Updated at : </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {new Date(lastUpdate).toDateString()}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {new Date(lastUpdate).toLocaleTimeString()}
                            </Typography>
                            <Typography variant="body2">{cardDetail.bottomText}</Typography>
                            <Typography color="textPrimary"> {country} </Typography>
                          </CardContent>
                      </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
};

export default Cards;