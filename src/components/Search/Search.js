import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { connect } from 'react-redux';

import { getAccessToken, getRefreshToken } from '../../redux/ducks/songReducer';

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
      searchResults: [],
      uri0: '',
      uri1: '',
      uri2: ''
    }

    // console.log('params: ', params);
    // console.log('props: ', this.props);
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
        console.log(response);
        this.setState({
          searchResults: response.tracks.items,
          uri0: response.tracks.items[0].uri,
          uri1: response.tracks.items[1].uri,
          uri2: response.tracks.items[2].uri,
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
    const embedUri0 = baseUri + this.state.uri0;
    const embedUri1 = baseUri + this.state.uri1;
    const embedUri2 = baseUri + this.state.uri2;
    const embedArr = [embedUri0, embedUri1, embedUri2];
    // console.log('embedUri0: ', embedUri0);
    // console.log('embedUri1: ', embedUri1);
    // console.log('embedUri2: ', embedUri2);

    const displayPlayers = this.state.searchResults.map((song, i) => {
      return (
        <div key={ i }>
          <iframe src={ embedArr[i] } width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
      );
    });
    
    // console.log('props: ', this.props);

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

export default connect(mapStateToProps, { getAccessToken, getRefreshToken })(Search);