import React from 'react';
import classes from './Home.css';
import burgerLogo from '../../assets/images/burger-logo.png';
import { NavLink } from 'react-router-dom';

const home = () => (
  <div className={classes.Main}>
    <img className={classes.Burger} src={burgerLogo} alt="burgerLogo" />
    <h1><NavLink to="/burgerbuilder">Get Started.</NavLink></h1>
  </div>
);

export default home;