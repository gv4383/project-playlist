import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSongs } from '../../redux/ducks/songReducer';

class Searched extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const { getSongs } = this.props

    getSongs();
  }

  render() {
    const { songs } = this.props;

    const displaySongs = songs.map((song, i) => {
      return (
        <div key={ i } >
          <p>{ song.song_name }</p>
        </div>
      );
    });

    return (
      <div>
        <h1>Searched</h1>
        { displaySongs }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getSongs })(Searched);