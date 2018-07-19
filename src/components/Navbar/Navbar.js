import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {

  render() {

    return (
      <div className="nav">
        <Link to="/"><button className="nav-button">Home</button></Link>
        <Link to="/search"><button className="nav-button">Search</button></Link>
        <Link to="/playlists"><button className="nav-button">Playlists</button></Link>
        <Link to="/user"><button className="nav-button">User</button></Link>
        <Link to="/playground"><button className="nav-button">Playground</button></Link>
      </div>
    );
  }
}

export default Navbar;