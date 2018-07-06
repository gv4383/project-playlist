import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

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
    console.log('props: ', this.props);

    let baseUri = 'https://open.spotify.com/embed?uri=';
    let embedUri = baseUri + this.state.nowPlaying.spotifyUri;

    return (
      <div>
        <h1>Playground</h1>
        <div>
          <img src={ this.state.nowPlaying.albumArt }/>
        </div>
        <div>
          <h3>Now Playing: { this.state.nowPlaying.name }</h3>
        </div>
        <div>
          <iframe src={ embedUri } width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        <div>
          <button onClick={ () => this.getNowPlaying() }>
            Check Now Playing
          </button>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken
  }
}

export default connect(mapStateToProps)(Playground);