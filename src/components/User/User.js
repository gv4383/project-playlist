import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class User extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      country: '',
      email: '',
      username: '',
      image: ''
    }
  }

  componentDidMount = () => {
    spotifyApi.getMe()
      .then((response) => {
        console.log('response: ', response);
        this.setState({
          country: response.country,
          email: response.email,
          username: response.id,
          image: response.images[0].url
        });
      });
  }
  
  render() {
    console.log('state: ', this.state);

    const { country, email, username, image } = this.state;

    return (
      <div>
        <h1 className="clear">{ username }</h1>
        ( ͡° ͜ʖ ͡°)
        <br />
        <div>
          <img src={ image } alt="" />
          <h3>Email: { email }</h3>
          <h3>Country: { country }</h3>
        </div>
      </div>
    );
  }
}

export default User;