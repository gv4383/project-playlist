import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import './User.css';

/*
 *  User component displays user's Spotify informaiton
 *  All information is pulled from Spotify
 *  User's information is stored locally when logged in
 */

// Allows component to utilize Spotify's API
const spotifyApi = new SpotifyWebApi();

class User extends Component {
  
  constructor(props) {
    super(props);

    // Local state - stores user's Spotify information locally
    this.state = {
      country: '',
      email: '',
      username: '',
      image: ''
    }
  }

  // Retrieves user's Spotify information and stores it in local state
  componentDidMount = () => {
    spotifyApi.getMe()
      .then((response) => {
        this.setState({
          country: response.country,
          email: response.email,
          username: response.id,
          image: response.images[0].url
        });
      });
  }
  
  render() {

    const { country, email, username, image } = this.state;

    return (
      <div className="user">
        <div className="user-card">
          <h1 className="clear">{ username }</h1>
          ( ͡° ͜ʖ ͡°)
          <div>
            <img className="avatar" src={ image } alt="" />
            <h3>Email: { email }</h3>
            <h3>Country: { country }</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default User;