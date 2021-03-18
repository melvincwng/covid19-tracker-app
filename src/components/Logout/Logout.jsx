import React, { useState, useContext } from 'react';
import styles from './Logout.module.css';
import axios from 'axios';
import { UserContext } from './../../UserContext';

const url = "https://covid19-tracker-app-express.herokuapp.com/users/logout";

function Logout() {
    const [ disabled, setDisabled ] = useState(false); //prevent user from clicking button too many times
    const { user, setUser }= useContext(UserContext);

    async function fetchMyAPI() {
        try {
            const logoutOutcome = await axios.post(url, { withCredentials: true });
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
        <div className={styles.container}>
            <h1>Are you sure you want to logout?</h1>
            <button type="submit" disabled={disabled} onClick={handleSubmit} className={styles.button}>Yes, log out</button>
        </div>
        
    );
}

export default Logout;