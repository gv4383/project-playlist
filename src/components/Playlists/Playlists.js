import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Playlist from './Playlist/Playlist';

import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  editPlaylist
} from '../../redux/ducks/songReducer';
import MatButton from '../minor_components/MatButton/MatButton';
import MatInput from '../minor_components/MatInput/MatInput';

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      edit: 'nothing'
    }
  }

  componentDidMount() {
    const { getPlaylists } = this.props;

    getPlaylists();
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

  cancelEditHandler = () => {
    this.setState({
      edit: 'nothing'
    });
  }

  submitEditHandler = (description, id) => {
    const { editPlaylist } = this.props;

    editPlaylist(id, {
      description
    })
    .then(
      this.setState({
        edit: 'nothing'
      })
    );
  }

  render() {
    const { playlists, deletePlaylist } = this.props;

    // maps through playlists array and renders the playlist name, description, an edit button, and delete button for every object in the array
    const displayPlaylists = playlists.map((playlist, i) => {
      if (this.state.edit == i) {
        return (
          <div key={ i }>
            <h2>{ playlist.playlist_name }</h2>
            {/* <input
              name="description"
              value={ this.state.description }
              onChange={ this.onChangeHandler }
            /> */}
            <MatInput
              name="description"
              value={ this.state.description }
              onChange={ this.onChangeHandler }
            />
            <br />
            <br />
            {/* <button onClick={ () => this.submitEditHandler(this.state.description, playlist.playlist_id) }>Submit</button>
            <button onClick={ this.cancelEditHandler }>Cancel</button> */}
            <MatButton
              classNames="blue"
              clickButton={ () => this.submitEditHandler(this.state.description, playlist.playlist_id) }
            >Submit</MatButton>
            <MatButton
              classNames="blue"
              clickButton={ this.cancelEditHandler }
            >Cancel</MatButton>
          </div>
        );
      }
      else {
        return (
          <div key={ i }>
            <Link to={ `/playlists/playlist/${ playlist.playlist_id }` }>
              <h2>{ playlist.playlist_name }</h2>
            </Link>
            <p>{ playlist.description }</p>
            {/* <button onClick={ () => this.setEditHandler(i) }>Edit</button>
            <button onClick={ () => deletePlaylist(playlist.playlist_id) }>Delete</button> */}
            <MatButton
              classNames="blue"
              clickButton={ () => this.setEditHandler(i) }
            >Edit</MatButton>
            <MatButton
              classNames="blue"
              clickButton={ () => deletePlaylist(playlist.playlist_id) }
            >Delete</MatButton>
          </div>
        );
      }
    });
    // console.log('this.props: ', this.props);

    return (
      <div>
        <h1>Playlists</h1>
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
  deletePlaylist,
  editPlaylist
})(Playlists);