import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
// import { prependOnceListener } from 'cluster';

class Navbar extends Component {

  render() {

    return (
      <div className="nav">
        <Link to="/"><button className="nav-button">HOME</button></Link>
        <Link to="/search"><button className="nav-button">SEARCH</button></Link>
        <Link to="/playlists"><button className="nav-button">PLAYLISTS</button></Link>
        <Link to="/user"><button className="nav-button">USER</button></Link>
        <Link to="/playground"><button className="nav-button">PLAYGROUND</button></Link>
      </div>
    );
  }
}

export default Navbar;