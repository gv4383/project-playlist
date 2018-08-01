import React, { Component } from 'react';
import { connect } from 'react-redux';

// Methods brought in from redux store
import {
  getPlaylists,
  createPlaylist
} from '../../redux/ducks/songReducer';

import MatButton from '../minor_components/MatButton/MatButton';
import MatInput from '../minor_components/MatInput/MatInput';

import PlayCard from './PlayCard/PlayCard';

import './Playlists.css';

/*
 *  Playlists component is responsible for displaying all of the user's current playlists
 *  New playlists can be created with a desired description
 *  Each playlist will be presented as a card
 */

class Playlists extends Component {

  constructor(props) {
    super(props);

    // Local state - stores name and description for new playlist to be created
    this.state = {
      name: '',
      description: ''
    }
  }

  // Retrieves playlists associated with the user
  componentDidMount() {

    // Pulled from redux
    const { getPlaylists, username } = this.props;

    getPlaylists(username);
  }

  onChangeHandler = (event) => {

    // sets the the appropriate state  depending on which input is being utilized
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Creates a playlist
  onSubmitHandler = (event) => {
    event.preventDefault();

    alert('Playlist created!');

    const { name, description } = this.state;
    const { createPlaylist, getPlaylists, username } = this.props;

    if (name && description) {
      createPlaylist({
        playlist_name: name,
        description: description,
        username: username
      })
      .then(() => getPlaylists(username))
      .then(this.setState({
        name: '',
        description: ''
      }));
    }
  }

  render() {

    // Pulled from redux
    const { playlists } = this.props;

    // maps through playlists array and renders the playlist name, description, an edit button, and delete button for every object in the array
    const displayPlaylists = playlists.map((playlist, i) => {

      return (
        <PlayCard
          uniqueKey={ i }
          playlist={ playlist }
          i={ i }
        />
      );
    });

    return (
      <div>
        <h1 className="clear">Playlists</h1>
        <br />
        <form onSubmit={ this.onSubmitHandler }>
          <MatInput
            name="name"
            value={ this.state.name }
            placeholder="Playlist Name"
            onChange={ this.onChangeHandler }
          />
          <MatInput
            name="description"
            value={ this.state.description }
            placeholder="Description"
            onChange={ this.onChangeHandler }
          />
          <br />
          <MatButton classNames="button">Add Playlist</MatButton>
        </form>
        <br />
        <br />
        <div className="list">
          { displayPlaylists }
        </div>
      </div>
    );
  }
}

// Brings in redux state through props
const mapStateToProps = (state) => {
  return state
}

// Connects Playlists component to redux store
export default connect(mapStateToProps, {
  getPlaylists,
  createPlaylist
})(Playlists);