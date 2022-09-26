import React, { useState, useContext } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
import { UserContext } from './../../UserContext';

const url = `${process.env.REACT_APP_BACKEND_API_URL}/articles`;

function Admin() {
    const { user, setUser } = useContext(UserContext);
    const [ disabled, setDisabled ] = useState(false);

    function handleSubmit(e) {
        async function fetchMyAPI() {
            try {
                const articleOutcome = await axios.post(url, formData, { withCredentials: true });
                alert(articleOutcome.data);
                setDisabled(false);
                window.location.href = '/articles'
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
        setDisabled(true);
        let formElement = document.getElementById("form");
        let formData = new FormData(formElement); 
        /*for (let [key, value] of formData.entries()) { 
            console.log(key, value);
        }*/
        fetchMyAPI();
    }

    // line 43 encType="multipart/form-data" -> This attribute is required for forms dealing with file uploads -> Source: https://www.w3schools.com/tags/att_form_enctype.asp
    // also remember in the 'name' attributes for the input tags -> it must match accordingly to the Model Schema, as written in the backend, if not there will be errors.
    // Using HTML5 form validation 'required' attribute, for more info on how to get it working, refer to: https://stackoverflow.com/questions/32310925/how-can-i-use-html5-validation-with-react
    return(
        <div className={styles.container}>
            <h1 className={styles.underline}>Admin Features</h1>
            <h3>Create new article:</h3>
            <form className={styles.form} id="form" encType="multipart/form-data" onSubmit={handleSubmit} data-testid="for-form-testing"> 
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Add a catchy title..." required></input>
                <label for="body" className={styles.spacing}>Body:</label>
                <textarea type="text" id="body" name="body" placeholder="Write your article here..." required></textarea>
                <label for="articleImage" className={styles.spacing}>Select an image:</label>
                <input type="file" id="articleImage" name="articleImage" accept="image/jpg, image/jpeg, image/png"></input>
                <label for="authorName" className={styles.spacing}>Author Name:</label>
                <input type="text" id="authorName" name="authorName" placeholder="Your name..." required></input>
                <input type="submit" value="Submit" disabled={disabled} className={styles.button}></input>
            </form>
        </div>
    );
}

export default Admin;
