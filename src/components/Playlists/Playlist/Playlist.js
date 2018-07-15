import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSongs, getPlaylists } from '../../../redux/ducks/songReducer';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getSongs } = this.props;

    getSongs();
  }

  render() {
    const { songs } = this.props;
    console.log('this.props.songs: ', songs);

    const displaySongs = songs.map((song, i) => {
      return (
        <div key={ i }>
          <p>{ song.song_name }</p>
        </div>
      );
    });

    return (
      <div>
        <h1>Playlist</h1>
        {songs[0] &&
        <h3>{songs[0].playlist_name}</h3>}
        { displaySongs }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, { getSongs })(Playlist);