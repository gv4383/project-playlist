import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { connect } from 'react-redux';

import './Search.css';

// Methods brought in from redux store
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

/*
 *  The Search component is responsible for searching songs within Spotify's music library
 *  Users can search for songs IF AND ONLY IF they are logged in through Spotify
 *  Spotify's API allows users to search for songs as long as they are granted an access token
 *  Access tokens are granted upon logging in
 *  Clicking the 'Request New Token' button will request a new access token
 */

// Allows requests to be made to Spotify's API
const spotifyApi = new SpotifyWebApi();

class Search extends Component {
  constructor(props) {
    super(props);

    // Retrieves access/refresh tokens, and user information from params and places them in local variables
    const params = this.getHashParams();
    const accessToken = params.access_token;
    const refreshToken = params.refresh_token;
    const country = params.country;
    const email = params.email;
    const username = params.username;

    // When an access token is obtained, the access/refresh tokens, and user information will be stored in redux
    if (accessToken) {
      this.props.getAccessToken(accessToken);
      this.props.getRefreshToken(refreshToken);
      this.props.storeCountry(country);
      this.props.storeEmail(email);
      this.props.storeUsername(username);
      spotifyApi.setAccessToken(accessToken);
    }

    // Local state
    this.state = {
      loggedIn: accessToken ? true : false,
      searchedSongInput: '',
      searchResults: [],
      selectedPlaylist: 1,
      selectedPlaylistName: 'Select Playlist'
    }
  }

  // Retrieves information passed through params when a user logs in
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

  // Searches for songs within Spotify's API
  searchSong = (input) => {
    spotifyApi.searchTracks(input)
      .then((response) => {
        // console.log('response: ', response);
        this.setState({
          searchResults: response.tracks.items
        });
      });
  }

  // Brings in user's playlists for the component to use
  componentDidMount = () => {
    // Brought in from redux
    const { getPlaylists, username } = this.props;

    getPlaylists(username);
  }

  // Stores user's input into local state when searching for a song
  onChangeHandler = (event) => {
    // console.log('input: ', event.target.value);
    this.setState({
      searchedSongInput: event.target.value
    });
  }

  // Selects a specific playlist from drop-down menu when selecting which playlist to add a song to
  selectHandler = (event) => {
    this.setState({
      selectedPlaylist: event.target.value
    });
  }

  // Searches for songs when user submits their search
  onSubmitHandler = (event) => {
    event.preventDefault();

    const { searchedSongInput } = this.state;

    this.searchSong(searchedSongInput)
  }

  render() {

    // Base uri required in addition to a song's Spotify's song uri to play a song through Spotify's embedded player
    const baseUri = 'https://open.spotify.com/embed?uri=';

    // List of user's playlists brough in from redux
    const { playlists } = this.props;

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

    // Maps through search results when a song is searched and displays it through embedded players
    const displayPlayers = this.state.searchResults.map((song, i) => {
      return (
        <div key={ i } className="song-card">
          <iframe src={ baseUri + song.uri } width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <div>

            {/* Contains all user's current playlists */}
            <DropdownButton title={ this.state.selectedPlaylistName }>
              { displayPlaylists }
            </DropdownButton>

            {/* Adds song to user's selected playlist */}
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

            {/* Requests new access token */}
            <button className="request-button"><a id="link" href={process.env.REACT_APP_LOGIN}>Request New Token</a></button>
          </div>
          <br />
          <br />
          <div className="search-container">
            <h2 className="search">
              This is a search page.<br />What else are you going to do?
            </h2>
            <div>
              <div>
                <form onSubmit={ this.onSubmitHandler }>
                  <div className="ui icon input">
                    <input 
                      onChange={ this.onChangeHandler }
                      value={ this.state.searchedSongInput }
                      type="text"
                      placeholder="Search for a song" 
                    />
                    <i onClick={ () => this.searchSong(this.state.searchedSongInput) } className="circular search link icon"></i>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Displays song cards when a song is searched */}
        <div className="display-songs">
          { this.state.searchResults && displayPlayers }
        </div>
      </div>
    );
  }
}

// Brings in redux state through props
const mapStateToProps = (state) => {
  return state;
};

// Connects Search component to redux store
export default connect(mapStateToProps, {
  getAccessToken,
  getRefreshToken,
  storeCountry,
  storeEmail,
  storeUsername,
  addSong,
  getPlaylists
})(Search);