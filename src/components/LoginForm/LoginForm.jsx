import React, { useState, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import axios from 'axios';
import { UserContext } from './../../UserContext';

const url = `${process.env.REACT_APP_BACKEND_API_URL}/users/login`;

function LoginForm() {
    const [ disabled, setDisabled ] = useState(false); //to prevent users from clicking multiple times
    const { user, setUser }= useContext(UserContext);

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                .required('This field is required.')
                .min(3, 'Username has at least 3 characters.'),
                password: Yup.string()
                .required('This field is required.')
                .min(8, 'Password has at least 8 characters.'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                async function fetchMyAPI() {
                    try {
                        // loginoutcome is the response object
                        // { withCredentials: true } -> this is used when axios is dealing with API requests (GET/POST/PUT/DEL)
                        // once you put that, axios will send your cookies alongside with ur requests to server OR receive the cookie from server
                        // https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
                        const loginOutcome = await axios.post(url, values, { withCredentials: true }) 
                        alert(loginOutcome.data[0]); //loginOutcome.data[0] contains the string message
                        setUser(loginOutcome.data[1]); //loginOutcome.data[1] contains the user document/object
                        setDisabled(false);
                        window.location.href = '/' //after clicking 'OK' on alert box, it redirects user to home-page, refer to link for more info: https://stackoverflow.com/questions/33622057/redirect-after-alert-box
                    } catch (err) {
                        // Refer to this link for more info on err.response: https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios
                        // Main idea, when we receive a response from the server (that contains an error object), the error object will contain the response property, that has the data we need
                        alert(err.response.data)
                        setDisabled(false);
                    }
                }
                setDisabled(true);
                fetchMyAPI();
                setSubmitting(false);
            }}
        >
            <Form className={styles.form} data-testid="login-form">
                <h1>Login</h1>
                
                <Field name="username" type="text" placeholder="Username" className={styles.fieldOne}/>
                <ErrorMessage name="username">
                    {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
        
                
                <Field name="password" type="password" placeholder="Password" className={styles.fieldTwo}/>
                <ErrorMessage name="password">
                    {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
        
                <button type="submit" disabled={disabled} className={styles.button} data-testid="login-button">Log In</button>
            </Form>
     </Formik>
    );
}

export default LoginForm;
