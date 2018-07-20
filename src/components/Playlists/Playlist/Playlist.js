import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSongs, removeSong } from '../../../redux/ducks/songReducer';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getSongs } = this.props;

    // getSongs(this.props.location.pathname.replace(/\D/g,''));
    getSongs(this.props.match.params.id);
  }

  render() {
    const { songs, removeSong } = this.props;

    // console.log('this.props: ', this.props);

    const baseUri = 'https://open.spotify.com/embed?uri=';

    const displaySongs = songs.map((song, i) => {
      return (
        <div key={ i }>
          <iframe src={ baseUri + song.spotify_uri } width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <button onClick={ () => removeSong(song.song_id) }>Remove</button>
          <br />
          <br />
        </div>
      );
    });

    return (
      <div>
        <h1 className="clear">Playlist</h1>
        { songs[0] &&
        <h3>{ songs[0].playlist_name }</h3> }
        { displaySongs }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, { getSongs, removeSong })(Playlist);