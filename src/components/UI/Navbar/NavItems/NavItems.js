import React from 'react';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className="navbar-nav mr-auto">
    <NavItem link="/burgerbuilder">Burger Builder</NavItem>
    <NavItem link="/orders">Orders</NavItem>
  </ul>
);

export default navItems;