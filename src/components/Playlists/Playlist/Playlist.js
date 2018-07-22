import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getSongs, removeSong } from '../../../redux/ducks/songReducer';

import './Playlist.css';
import close from '../../../baseline-close-24px.svg';

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
    const { songs, removeSong, getSongs } = this.props;

    // console.log('this.props: ', this.props);

    const baseUri = 'https://open.spotify.com/embed?uri=';

    const displaySongs = songs.map((song, i) => {
      return (
        <div key={ i } className="playlist-song-card">
          <iframe src={ baseUri + song.spotify_uri } width="260" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <br />
          {/* <button onClick={ () => removeSong(song.song_id) }>Remove</button> */}
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
        {/* <h1 className="clear">Playlist</h1> */}
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

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, { getSongs, removeSong })(Playlist);