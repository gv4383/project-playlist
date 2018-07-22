import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import logo from '../../logo.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        {/* <header className="home-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className=>
            <h1 className="title">MusicSquirrel</h1>
            <Button className="menu" onClick={ () => this.setState({ open: !this.state.open })}>Menu</Button>
          </div>
        </header> */}
        <div className="home-container">
          <h1 className="welcome">Welcome</h1>
          <h3>Get started by logging in with Spotify below!</h3>
          <button className="login-button"><a id="link" href='http://localhost:3001/login'>Login with Spotify</a></button>
        </div>
      </div>
    );
  }
}

export default Home;