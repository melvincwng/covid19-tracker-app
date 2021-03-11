import React from 'react';
import styles from './NavigationBar.module.css';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
    return(
      <Navbar bg="transparent" expand="lg" className={styles.navbar}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#login">Login</Nav.Link>
          <Nav.Link href="#register">Register</Nav.Link>
          <Nav.Link href="#articles">Articles</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
};

export default NavigationBar;