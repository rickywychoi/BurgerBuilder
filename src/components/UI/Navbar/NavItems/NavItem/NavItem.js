import React from 'react';

const navItem = (props) => (
  <li className="nav-item">
    <a className="nav-link" href={props.link}>{props.children}</a>
  </li>
);

export default navItem;