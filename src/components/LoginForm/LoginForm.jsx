import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

function LoginForm() {

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                .required('This field is required.')
                .min(3, 'Your username must have at least 3 characters.'),
                password: Yup.string()
                .required('This field is required.')
                .min(8, 'Your password must have at least 8 characters.'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >
            <Form className={styles.form}>
                <h1>Login</h1>
                
                <Field name="username" type="text" placeholder="Username" className={styles.fieldOne}/>
                <ErrorMessage name="username">
                    {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
        
                
                <Field name="password" type="text" placeholder="Password" className={styles.fieldTwo}/>
                <ErrorMessage name="password">
                    {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
        
                <button type="submit" className={styles.button}>Log In</button>
            </Form>
     </Formik>
    );
}

export default LoginForm;
