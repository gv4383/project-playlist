import React, { Component } from 'react';

import './Home.css';

/*
 *  This component acts more like a welcome page
 *  Users are prompted with a 'LOGIN WITH SPOTIFY' button
 *  Login button routes users to Spotify to login
 *  User will be returned back to web app upon logging in with Spotify
 */

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <h1 className="welcome">Welcome</h1>
          <h3>Get started by logging in with Spotify below!</h3>
          <button className="login-button"><a id="link" href={process.env.REACT_APP_LOGIN}>LOGIN WITH SPOTIFY</a></button>
        </div>
      </div>
    );
  }
}

export default Home;