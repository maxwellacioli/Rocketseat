import React, { Component } from 'react';

import './Header.css';

import profile from '../assets/profile.png';

class Header extends Component {
  render() {
    return <header>
            <h2>facebook</h2>
            <ul>
              <li><p id="profile-label" >Meu perfil</p></li>
              <li><img id="profile-img" src={profile} alt="profile" /></li>
            </ul>
          </header>
  };
}

export default Header;