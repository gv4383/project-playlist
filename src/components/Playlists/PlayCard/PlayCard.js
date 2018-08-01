import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Methods pulled from redux store
import { getPlaylists, editPlaylist, deletePlaylist } from '../../../redux/ducks/songReducer';

import MatButton from '../../minor_components/MatButton/MatButton';
import MatInput from '../../minor_components/MatInput/MatInput';

/*
 *  PlayCard component is responsible for creating a displayable card for each user's playlist
 *  Each card should display the playlist name, album art, description, and an Edit/Delete Button
 */

class PlayCard extends Component {

  constructor(props) {
    super(props);

    // Local state
    this.state = {
      edit: false,
      description: this.props.playlist.description,
      index: this.props.i
    }
  }

  // Stores user's description input into local state
  onChangeHandler = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  // Changes edit state to true/false
  editHandler = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  // Submits changes to a playlist's description
  submitHandler = (id, description) => {
    const { editPlaylist, getPlaylists, username } = this.props;

    this.setState({
      edit: !this.state.edit
    });

    editPlaylist(id, {
      description
    })
    .then(() => getPlaylists(username));
  }

  render() {

    // Pulled from redux store
    const { playlist, getPlaylists, deletePlaylist, username } = this.props;

    // Displayed if edit state is true - user wants to edit the playlist's description
    if (this.state.edit) {
      return (
        <div
          key={ this.props.uniqueKey }
          className="playlist-container"
        >
          <h2>{ playlist.playlist_name }</h2>
          <MatInput
            name="description"
            value={ this.state.description }
            onChange={ this.onChangeHandler }
          />
          <MatButton
            classNames="blue"
            clickButton={ () => this.submitHandler(playlist.playlist_id, this.state.description) }
          >Submit</MatButton>
          <MatButton
            classNames="blue"
            clickButton={ this.editHandler }
          >Cancel</MatButton>
        </div>
      );
    }

    // Displayed if edit state is false - user is done editing the playlist's description
    else {
      return (
        <div
          key={ this.props.uniqueKey }
          className="playlist-container"
        >

          {/* When clicked, sends users to that specific playlist page associated with the playlist id */}
          <Link to={ `/playlists/playlist/${ playlist.playlist_id}` }>
            <img src="https://i.scdn.co/image/36049a5d10a04fced95a0c57ecbf441e0e98f817" />
            <h2>{ playlist.playlist_name }</h2>
            <p>{ playlist.description }</p>
          </Link>
          <div className="bottom-buttons">
            <MatButton
              classNames="blue"
              clickButton={ this.editHandler }
            >Edit</MatButton>
            <MatButton
              classNames="blue"
              clickButton={ () => deletePlaylist(playlist.playlist_id).then(() => getPlaylists(username)) }
            >Delete</MatButton>
          </div>
        </div>
      );
    }
  }
}

// Brings in redux state through props
const mapStateToProps = (state) => {
  return state;
}

// Connects PlayCard component to redux store
export default connect(mapStateToProps, { getPlaylists, editPlaylist, deletePlaylist })(PlayCard);