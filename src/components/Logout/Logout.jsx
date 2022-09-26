import React, { useState, useContext } from 'react';
import styles from './Logout.module.css';
import axios from 'axios';
import { UserContext } from './../../UserContext';

const url = `${process.env.REACT_APP_BACKEND_API_URL}/users/logout`;

function Logout() {
    const [ disabled, setDisabled ] = useState(false); //prevent user from clicking button too many times
    const { user, setUser }= useContext(UserContext);

    async function fetchMyAPI() {
        try {
            // actual syntax of axios.post is axios.post(url, data, config) where url is a string, data & configs are objects.
            // what I observed is that for most axios requests, the 'config' object is usually optional
            // hence in this case, the most important for axios post request is to have axios.post(url, data)
            // In our case, we need the config object '{ withCredentials: true }' so that our axios requests are sent together with our cookie
            // but the thing is if we just type axios.post(url, { withCredentials: true });
            // what I believe the system sees it as is as axios.post(url, data). 
            // Hence system thinks we are posting a 'data' object { withCredentials: true }... but that's not the case
            // and a result, eventually it will lead to a bug where the cookie cannot be cleared when I send a post req to that url
            // To solve that bug, instead, I add in the 'data' object as null -> then our cookie get cleared!
            const logoutOutcome = await axios.post(url, null, { withCredentials: true }); 
            alert(logoutOutcome.data);
            window.location.href = '/';
            setDisabled(false);
            setUser(null);
        } catch (err) {
            console.log(err)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setDisabled(true);
        fetchMyAPI();
    }

    return (
        <div className={styles.container} data-testid="logout-form">
            <h1>Are you sure you want to logout?</h1>
            <button type="submit" disabled={disabled} onClick={handleSubmit} className={styles.button} data-testid="logout-button">Yes, log out</button>
        </div>
        
    );
}

export default Logout;