import React from 'react';
import './Navbar.css';

import logo from './logoesq.png';
import searchIcon from './searcico2.png';
import pp from './karen.png';

function Navbar(){
    return(
        <>
          <div className="navbar">
            <div className="left">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="center">
              <ul>
                <li><a href="#">INICIO</a></li>
                <li><a href="#">RESERVAR</a></li>
                <li><a href="#">SECCIONES</a></li>
              </ul>
            </div>
            <div className="right">
              <a href="#"><img src={searchIcon} alt="Search" className="icon" /></a>
              <a href="#"><img src={pp} alt="Profile" className="profile-image" /></a>
            </div>
          </div>
        </>
    );
}

export default Navbar;