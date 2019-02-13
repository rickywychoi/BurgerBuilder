import React from 'react';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className="navbar-nav mr-auto">
    <NavItem link="/">Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default navItems;