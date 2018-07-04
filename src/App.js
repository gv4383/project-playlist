import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import SpotifyWebApi from 'spotify-web-api-js';

import routes from './routes';
import store from './redux/store';

import logo from './logo.svg';
import './App.css';

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
      }
    }

    console.log(params);
  }

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
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
        console.log(response);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[1].url,
            spotifyUri: response.item.uri
          }
        });
      }).then(console.log(this.state));
  }

  render() {
    let embedUri = `https://open.spotify.com/embed?uri=${ this.state.nowPlaying.spotifyUri }`;
    console.log(embedUri);

    return (
      <Provider store={ store }>
        <HashRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">MusicSquirrel</h1>
            </header>
            <a href='http://localhost:8888'>Login to Spotify</a>
            <br />
            <br />
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
            {/* { routes } */}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
