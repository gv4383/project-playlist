import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getPlaylists,
  createPlaylist
} from '../../redux/ducks/songReducer';

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    console.log('this.props: ', this.props);
    const { name, description } = this.state;
    const { createPlaylist, history } = this.props;

    if (name && description) {
      createPlaylist({
        playlist_name: name,
        description: description
      });
    }
  }

  render() {
    const { playlists } = this.props;

    // maps through playlists array and renders the playlist name, description, an edit button, and delete button for every object in the array
    const displayPlaylists = playlists.map((playlist, i) => {
      return (
        <div key={ i }>
          <h2>{ playlist.playlist_name }</h2>
          <p>{ playlist.description }</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      );
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
  createPlaylist
})(Playlists);