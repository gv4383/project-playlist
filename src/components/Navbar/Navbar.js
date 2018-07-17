import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {

    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/playlists">Playlists</Link>
        <Link to="/user">User</Link>
        <Link to="/playground">Playlground</Link>
      </div>
    );
  }
}

export default Navbar;