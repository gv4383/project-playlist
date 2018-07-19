import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <button className="basic-button"><a id="link" href='http://localhost:3001/login'>Login to Spotify</a></button>
      </div>
    );
  }
}

export default Home;