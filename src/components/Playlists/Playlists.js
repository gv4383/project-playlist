import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getPlaylists,
  createPlaylist
} from '../../redux/ducks/songReducer';
import MatButton from '../minor_components/MatButton/MatButton';
import MatInput from '../minor_components/MatInput/MatInput';
import PlayCard from './PlayCard/PlayCard';

import './Playlists.css';

class Playlists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    }
  }

  componentDidMount() {
    const { getPlaylists, username } = this.props;

    getPlaylists(username);
  }

  onChangeHandler = (event) => {
    // console.log(`${ event.target.name }: ${ event.target.value }`)

    // sets the the appropriate state  depending on which input is being utilized
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    alert('Playlist created!');

    // console.log('this.props: ', this.props);
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
    const { playlists } = this.props;
    // console.log('props: ', this.props);

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
          {/* <input 
            name="name"
            value={ this.state.name }
            placeholder="Playlist Name"
            onChange={ this.onChangeHandler }
          />
          <input 
            name="description"
            value={ this.state.description }
            placeholder="Description"
            onChange={ this.onChangeHandler }
          />
          <button>Add Playlist</button> */}
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {
  getPlaylists,
  createPlaylist
})(Playlists);