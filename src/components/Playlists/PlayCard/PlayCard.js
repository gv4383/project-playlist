import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPlaylists, editPlaylist, deletePlaylist } from '../../../redux/ducks/songReducer';
import MatButton from '../../minor_components/MatButton/MatButton';
import MatInput from '../../minor_components/MatInput/MatInput';

class PlayCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      description: this.props.playlist.description,
      index: this.props.i
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  editHandler = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

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
    const { playlist, getPlaylists, deletePlaylist, username } = this.props;

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
    else {
      return (
        <div
          key={ this.props.uniqueKey }
          className="playlist-container"
        >
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

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { getPlaylists, editPlaylist, deletePlaylist })(PlayCard);