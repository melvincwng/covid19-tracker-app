import React, { useState } from 'react';
import styles from './Logout.module.css';
import axios from 'axios';

function Logout() {
    const [ disabled, setDisabled ] = useState(false); //prevent user from clicking button too many times

    function handleSubmit(e) {
        e.preventDefault();
        setDisabled(true);
        // mocking the axios post request to backend (to allow user to logout), which takes a couple of seconds
        setTimeout(function() {
            alert('You have logged out!');
            setDisabled(false);
        }
        , 3000);
    }

    return (
        <div className={styles.container}>
            <h1>Are you sure you want to logout?</h1>
            <button type="submit" disabled={disabled} onClick={handleSubmit} className={styles.button}>Yes, log out</button>
        </div>
        
    );
}

export default Logout;