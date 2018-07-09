import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { getPlaylists } from '../../redux/ducks/songReducer';

class Playlists extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getPlaylists } = this.props;

    getPlaylists();
  }

  deletePlaylist() {

  }

  render() {
    const { playlists } = this.props;
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
        <input placeholder="Playlist Name" />
        <input placeholder="Description" />
        <button>Add Playlist</button>
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

export default connect(mapStateToProps, { getPlaylists })(Playlists);