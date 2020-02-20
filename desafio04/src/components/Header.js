import React, { Component } from 'react';

import './Header.css';

import profile from '../assets/profile.png';

class Header extends Component {
  render() {
    return <header>
            <h2 className="test" >facebook</h2>
            <ul>
              <li><p className="profile-label" >Meu perfil</p></li>
              <li><img className="profile-img" src={profile} alt="profile" /></li>
            </ul>
          </header>
  };
}

export default Header;