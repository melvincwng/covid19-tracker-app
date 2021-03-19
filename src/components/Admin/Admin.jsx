import React, { useContext } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
import { UserContext } from './../../UserContext';

const url = "https://covid19-tracker-app-express.herokuapp.com/articles";

function Admin() {
    const { user, setUser } = useContext(UserContext);

    function handleSubmit(e) {
        async function fetchMyAPI() {
            try {
                const articleOutcome = await axios.post(url, formData, { withCredentials: true });
                console.log(articleOutcome);
            } catch (err) {
                console.log(err)
            }
        }
        //For more info on FormData, refer to: https://developer.mozilla.org/en-US/docs/Web/API/FormData
        // Line 28  will generate a FormData object and store it in the variable formData
        // However, if you do try to console.log(formData) => you will see this on your console => FormData {}
        // You may think it's empty, however this FormData object is NOT empty
        // To see the key,values pairs inside the FormData object, use the code from line 29 - 31;
        // For more info, refer to https://stackoverflow.com/questions/25040479/formdata-created-from-an-existing-form-seems-empty-when-i-log-it
        // and refer to https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries
        e.preventDefault();
        let formElement = document.getElementById("form");
        let formData = new FormData(formElement); 
        /*for (let [key, value] of formData.entries()) { 
            console.log(key, value);
        }*/
        console.log(formData)
        fetchMyAPI();
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.underline}>Admin Features</h1>
            <h3>Create new article:</h3>
            <form className={styles.form} id="form">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Add a catchy title..."></input>
                <label for="body" className={styles.spacing}>Body:</label>
                <textarea type="text" id="body" name="body" placeholder="Write your article here..."></textarea>
                <label for="image" className={styles.spacing}>Select an image:</label>
                <input type="file" id="image" name="image" accept="image/jpg, image/jpeg, image/png"></input>
                <label for="authorName" className={styles.spacing}>Author Name:</label>
                <input type="text" id="authorName" name="authorName" placeholder="Your name..."></input>
                <input type="submit" value="Submit" className={styles.button} onClick={handleSubmit}></input>
            </form>
        </div>
    );
}

export default Admin;
