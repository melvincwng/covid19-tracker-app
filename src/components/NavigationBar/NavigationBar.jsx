import React, { useContext } from 'react';
import styles from './NavigationBar.module.css';
import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from './../../UserContext';

function NavigationBar() {

    //useContext() will basically take in 1 argument, which is the component which it will draw the context from, in this case UserContext
    // then it will look at the UserContext component in app.js and the value of the 'value' attribute will be returned
    // & stored in the const/variable at line 11
    const { user, setUser }= useContext(UserContext);  // object destructuring done here

    return(
      <Navbar bg="transparent" expand="lg" className={styles.navbar}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            { user ? <Nav.Link href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link> }
            <Nav.Link href="/articles">Articles</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
};

export default NavigationBar;