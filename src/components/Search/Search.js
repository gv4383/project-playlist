import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { connect } from 'react-redux';

import {
  getAccessToken,
  getRefreshToken,
  addSong
} from '../../redux/ducks/songReducer';

const spotifyApi = new SpotifyWebApi();

class Search extends Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();
    const accessToken = params.access_token;
    const refreshToken = params.refresh_token;

    if (accessToken) {
      this.props.getAccessToken(accessToken);
      this.props.getRefreshToken(refreshToken);
      spotifyApi.setAccessToken(accessToken);
    }

    this.state = {
      loggedIn: accessToken ? true : false,
      searchedSongInput: '',
      searchResults: []
    }
  }

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(9);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  searchSong = (input) => {
    spotifyApi.searchTracks(input)
      .then((response) => {
        // console.log(response);
        this.setState({
          searchResults: response.tracks.items
        });
      });
  }

  onChangeHandler = (event) => {
    this.setState({
      searchedSongInput: event.target.value
    });
  }

  render() {
    const baseUri = 'https://open.spotify.com/embed?uri=';
    console.log('this.state.searchResults: ', this.state.searchResults);

    const displayPlayers = this.state.searchResults.map((song, i) => {
      return (
        <div key={ i }>
          <iframe src={ baseUri + song.uri } width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <button onClick={ () => addSong({
            spotify_uri: song.uri,
            song_name: song.name,
            artist: song.artists[0].name,
            album: song.album.name,
            album_art: song.album.images[1].url,
            playlist_id: 1
          }) }>Add</button>
          <br />
          <br />
        </div>
      );
    });

    return (
      <div>
        <h1>Search</h1>
        <a href='http://localhost:8888'>Login to Spotify</a>
        <br />
        <br />
        <div>
          { this.state.loggedIn &&
            <div>
              <input placeholder="Search for a song" value={ this.state.searchedSongInput } onChange={ this.onChangeHandler } />
              <button onClick={ () => this.searchSong(this.state.searchedSongInput) }>
                Search Song
              </button>
              <br />
              <br />
              { this.state.searchResults && displayPlayers }
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
};

export default connect(mapStateToProps, { getAccessToken, getRefreshToken, addSong })(Search);