import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

import MatButton from '../minor_components/MatButton/MatButton';
import MatInput from '../minor_components/MatInput/MatInput';

import './Playground.css';


const spotifyApi = new SpotifyWebApi();

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPlaying: { 
        name: 'Not Checked',
        albumArt: '',
        spotifyUri: ''
      }
    }
  }

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        // console.log('response: ', response);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[1].url,
            spotifyUri: response.item.uri
          }
        });
      });
      // .then(console.log(this.state));
  }
  
  render() {
    const { country, email, username } = this.props;
    if (country && email && username) {
      console.log('props: ', this.props);
    };

    let baseUri = 'https://open.spotify.com/embed?uri=';
    let embedUri = baseUri + this.state.nowPlaying.spotifyUri;

    return (
      <div className="text">
        <h1>Playground</h1>
        <div>
          <img className="album-art" src={ this.state.nowPlaying.albumArt }/>
        </div>
        <div>
          <h3>Now Playing: { this.state.nowPlaying.name }</h3>
        </div>
        <div>
          <iframe src={ embedUri } width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        <div>
          <MatButton
            classNames="button"
            clickButton={ () => this.getNowPlaying() }>

            Check Now Playing
          </MatButton>
        </div>
        <br />
        <br />
        <MatInput />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    country: state.country,
    email: state.email,
    username: state.username
  }
}

// export withStyles(styles)(Playground);
export default connect(mapStateToProps)(Playground);