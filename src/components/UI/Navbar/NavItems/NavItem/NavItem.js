import React from 'react';
import { NavLink } from 'react-router-dom';

const navItem = (props) => (
  <li className="nav-item">
    <NavLink className="nav-link" to={props.link} exact={props.exact}>{props.children}</NavLink>
  </li>
);

export default navItem;