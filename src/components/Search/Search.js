import React, { Component } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class Search extends Component {
  constructor() {
    super();

    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { 
        name: 'Not Checked',
        albumArt: '',
        spotifyUri: ''
      },
      playlistName: '',
      playlistTracks: [],
      trackUri0: '',
      trackUri1: '',
      trackUri2: '',
      searchedSongInput: ''
    }

    console.log('params: ', params);
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

  getAPlaylist = () => {
    spotifyApi.getPlaylist() // put user's spotify id and playlist id as arguments here
      .then((response) => {
        // console.log(response);
        this.setState({
          playlistName: response.name,
          playlistTracks: response.tracks.items,
          trackUri0: response.tracks.items[0].track.uri,
          trackUri1: response.tracks.items[1].track.uri,
          trackUri2: response.tracks.items[4].track.uri
        });
      });
  }

  searchSong = (input) => {
    spotifyApi.searchTracks(input)
      .then((response) => {
        console.log(response);
      });
  }

  onChangeHandler = (event) => {
    this.setState({
      searchedSongInput: event.target.value
    });
  }

  render() {
    let baseUri = 'https://open.spotify.com/embed?uri=';
    let embedUri = baseUri + this.state.nowPlaying.spotifyUri;
    // console.log(embedUri);
    let embedUri0 = baseUri + this.state.trackUri0;
    let embedUri1 = baseUri + this.state.trackUri1;
    let embedUri2 = baseUri + this.state.trackUri2;

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
            </div>
          }
        </div>
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
          { this.state.loggedIn &&
            <button onClick={ () => this.getNowPlaying() }>
              Check Now Playing
            </button>
          }
        </div>
        <br />
      </div>
    );
  }
}

export default Search;