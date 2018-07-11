import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {
  getPlaylists,
  createPlaylist,
  deletePlaylist
} from '../../redux/ducks/songReducer';

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: 'nothing',
      name: '',
      description: ''
    }
  }

  componentDidMount() {
    const { getPlaylists } = this.props;

    getPlaylists();
  }

  onChangeHandler = (event) => {
    console.log(`${ event.target.name }: ${ event.target.value }`)

    // sets the the appropriate state  depending on which input is being utilized
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log('this.props: ', this.props);
    const { name, description } = this.state;
    const { createPlaylist } = this.props;

    if (name && description) {
      createPlaylist({
        playlist_name: name,
        description: description
      });
    }
  }

  setEditHandler = (event) => {
    this.setState({
      edit: `${event}`
    });
  }

  resetEditHandler = () => {
    this.setState({
      edit: 'nothing'
    });
  }

  render() {
    const { playlists, deletePlaylist } = this.props;

    // maps through playlists array and renders the playlist name, description, an edit button, and delete button for every object in the array
    const displayPlaylists = playlists.map((playlist, i) => {
      if (this.state.edit == i) {
        return (
          <div key={ i }>
            <h2>{ playlist.playlist_name }</h2>
            <input  />
            <br />
            <br />
            <button onClick={ this.resetEditHandler }>Submit</button>
            <button onClick={ () => deletePlaylist(playlist.playlist_id)}>Delete</button>
          </div>
        );
      }
      else {
        return (
          <div key={ i }>
            <h2>{ playlist.playlist_name }</h2>
            <p>{ playlist.description }</p>
            <button onClick={ () => this.setEditHandler(i) }>Edit</button>
            <button onClick={ () => deletePlaylist(playlist.playlist_id)}>Delete</button>
          </div>
        );
      }
    });
    // console.log('playlists: ', playlists);

    return (
      <div>
        <h1>Playlists</h1>
        <br />
        <form onSubmit={ this.onSubmitHandler }>
          <input 
            name="name"
            value={ this.state.name }
            placeholder="Playlist Name"
            onChange={ this.onChangeHandler } />
          <input 
            name="description"
            value={ this.state.description }
            placeholder="Description"
            onChange={ this.onChangeHandler } />
          <button>Add Playlist</button>
        </form>
        <br />
        <br />
        { displayPlaylists }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {
  getPlaylists,
  createPlaylist,
  deletePlaylist
})(Playlists);