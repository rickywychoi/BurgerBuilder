import React from 'react';
import Logo from '../Logo/Logo';
import NavItems from './NavItems/NavItems';

const navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-3">
      <a href="/">
        <Logo />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <NavItems />
      </div>
    </nav>
  );
}

export default navbar;