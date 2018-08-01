import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getSongs, removeSong } from '../../../redux/ducks/songReducer';

import './Playlist.css';
import close from '../../../baseline-close-24px.svg';

/*
 *  Playlist component is responsible for displaying all songs saved to a specific playlist
 *  Each playlist ONLY displays the songs associated to it
 *  Users can remove songs from each playlist
 */

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  // Retrieves songs saved in redux
  componentDidMount = () => {
    // Pulled from redux
    const { getSongs } = this.props;

    // Retrieves songs based on the playlist id passed through params when a playlist is clicked on
    getSongs(this.props.match.params.id);
  }

  render() {

    // Pulled form redux
    const { songs, removeSong, getSongs } = this.props;

    // Base uri used in addition to a song's Spotify uri in order to play it through an embedded player
    const baseUri = 'https://open.spotify.com/embed?uri=';

    // Displays the playable songs associated with that specific playlist
    const displaySongs = songs.map((song, i) => {
      return (
        <div key={ i } className="playlist-song-card">
          <iframe src={ baseUri + song.spotify_uri } width="260" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <br />

          {/* Removes a song from the playlist */}
          <Button bsStyle="danger" onClick={ () => removeSong(song.song_id).then(() => getSongs(this.props.match.params.id)) }><img src={ close } /></Button>
          <br />
          <br />
        </div>
      );
    });

    return (
      <div>
        <br />
        <br />

        {/* Displays the playlist name */}
        { songs[0] &&
        <h1 className="clear">{ songs[0].playlist_name }</h1> }
        <br />
        <div className="display-songs">
          { displaySongs }
        </div>
      </div>
    );
  }
}

// Brings in redux state through props
const mapStateToProps = state => {
  return state;
}

// Connects Playlist component to redux store
export default connect(mapStateToProps, { getSongs, removeSong })(Playlist);