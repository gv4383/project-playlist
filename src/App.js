import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Collapse, Button } from 'react-bootstrap';

import SpotifyWebApi from 'spotify-web-api-js';

import routes from './routes';
import store from './redux/store';
import Navbar from './components/Navbar/Navbar';

import logo from './logo.svg';
import menu from './round_menu_white_24dp.png';
import './App.css';
import { EventEmitter } from 'events';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
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
      searchedSongInput: '',
      open: true
    }

    // console.log(params);
  }

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(8);
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
        // console.log(response);
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
      <Provider store={ store }>
        <HashRouter>
          <div className="App">
            {/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div>
                <h1 className="App-title">MusicSquirrel</h1>
                <Button className="menu" onClick={ () => this.setState({ open: !this.state.open })}><img src={menu} /></Button>
              </div>
            </header> */}
            {/* <h3>Playlist Name: { this.state.playlistName }</h3>
            <div>
              <iframe src={ embedUri0 } width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div>
              <iframe src={ embedUri1 } width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div>
              <iframe src={ embedUri2 } width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div>
              { this.state.loggedIn &&
                <button onClick={ () => this.getAPlaylist() }>
                  Get Playlist
                </button>
              }
            </div>
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
            </div> */}
            <div className="menu-bar">
              <img id="menu-button" src={ menu } alt="menu" onClick={ () => this.setState({
                open: !this.state.open
              }) } />
            </div>
            <Collapse in={ this.state.open }>
              <div>
                <Navbar />
              </div>
            </Collapse>
            {/* <Navbar /> */}
            { routes }
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
