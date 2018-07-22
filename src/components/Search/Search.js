import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { connect } from 'react-redux';

import './Search.css';

import {
  getAccessToken,
  getRefreshToken,
  storeCountry,
  storeEmail,
  storeUsername,
  addSong,
  getPlaylists
} from '../../redux/ducks/songReducer';

import MatButton from '../minor_components/MatButton/MatButton';
import MatInput from '../minor_components/MatInput/MatInput';

import {
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

const spotifyApi = new SpotifyWebApi();

class Search extends Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();
    // console.log('params: ', params);
    const accessToken = params.access_token;
    const refreshToken = params.refresh_token;
    const country = params.country;
    const email = params.email;
    const username = params.username;

    if (accessToken) {
      this.props.getAccessToken(accessToken);
      this.props.getRefreshToken(refreshToken);
      this.props.storeCountry(country);
      this.props.storeEmail(email);
      this.props.storeUsername(username);
      spotifyApi.setAccessToken(accessToken);
    }

    this.state = {
      loggedIn: accessToken ? true : false,
      searchedSongInput: '',
      searchResults: [],
      selectedPlaylist: 1,
      selectedPlaylistName: 'Select Playlist'
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
        console.log('response: ', response);
        this.setState({
          searchResults: response.tracks.items
        });
      });
  }

  componentDidMount = () => {
    const { getPlaylists } = this.props;

    getPlaylists();
  }

  onChangeHandler = (event) => {
    // console.log('input: ', event.target.value);
    this.setState({
      searchedSongInput: event.target.value
    });
  }

  selectHandler = (event) => {
    // console.log(event.target.value);
    this.setState({
      selectedPlaylist: event.target.value
    });
  }

  render() {
    const baseUri = 'https://open.spotify.com/embed?uri=';
    // console.log('this.props: ', this.props);

    const { playlists } = this.props;
    // console.log('playlists: ', playlists)
    // console.log('state: ', this.state);

    const displayPlaylists = playlists.map((playlist, i) => {
      // return <option key={ i } value={ playlist.playlist_id }>{ playlist.playlist_name }</option>
      return (
        <MenuItem
          key={ i }
          eventKey={ playlist.playlist_id }
          onSelect={ (eventKey) => this.setState({
            selectedPlaylist: eventKey,
            selectedPlaylistName: playlist.playlist_name
          }) }
        >{ playlist.playlist_name }</MenuItem>
      );
    });

    const displayPlayers = this.state.searchResults.map((song, i) => {
      return (
        <div key={ i } className="song-card">
          <iframe src={ baseUri + song.uri } width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <div>
            {/* <select onChange={ this.selectHandler }>
              <option value={ 1 }>kool jamz</option>
              <option value={ 2 }>awesome playlist</option>
              <option value={ 4 }>test playlist</option>
              { displayPlaylists }
            </select> */}
            <DropdownButton title={ this.state.selectedPlaylistName }>
              { displayPlaylists }
            </DropdownButton>
            {/* <button onClick={ () => addSong({
              spotify_uri: song.uri,
              song_name: song.name,
              artist: song.artists[0].name,
              album: song.album.name,
              album_art: song.album.images[1].url,
              playlist_id: this.state.selectedPlaylist
            }) }>Add</button> */}
            <MatButton
              classNames="button"
              clickButton={ () => addSong({
                spotify_uri: song.uri,
                song_name: song.name,
                artist: song.artists[0].name,
                album: song.album.name,
                album_art: song.album.images[1].url,
                playlist_id: this.state.selectedPlaylist
              }) }
            >Add</MatButton>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="search-top">
          <div className="button-placement">
            <button className="request-button"><a id="link" href='http://localhost:3001/login'>Request New Token</a></button>
          </div>
          <br />
          <br />
          <div className="search-container">
            <h3 className="search">Search for a song below!</h3>
            <div>
              {/* { this.state.loggedIn && */}
                <div>
                  {/* <input placeholder="Search for a song" value={ this.state.searchedSongInput } onChange={ this.onChangeHandler } /> */}
                  <MatInput
                    value={ this.state.searchedSongInput } 
                    placeholder="Search for a song"
                    onChange={ this.onChangeHandler }
                  />
                  <br />
                  {/* <button onClick={ () => this.searchSong(this.state.searchedSongInput) }>
                    Search Song
                  </button> */}
                  <MatButton classNames="button" clickButton={ () => this.searchSong(this.state.searchedSongInput) }>Search</MatButton>
                </div>
          </div>
          </div>
        </div>
        <div className="display-songs">
          { this.state.searchResults && displayPlayers }
        </div>
          {/* } */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getAccessToken,
  getRefreshToken,
  storeCountry,
  storeEmail,
  storeUsername,
  addSong,
  getPlaylists
})(Search);