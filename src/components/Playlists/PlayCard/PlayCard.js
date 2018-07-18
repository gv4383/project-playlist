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
    const { editPlaylist } = this.props;

    this.setState({
      edit: !this.state.edit
    });

    editPlaylist(id, {
      description
    })
    .then(() => this.props.getPlaylists());
  }

  render() {
    const { playlist, getPlaylists, deletePlaylist } = this.props;

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
            <h2>{ playlist.playlist_name }</h2>
          </Link>
          <p>{ playlist.description }</p>
          <MatButton
            classNames="blue"
            clickButton={ this.editHandler }
          >Edit</MatButton>
          <MatButton
            classNames="blue"
            clickButton={ () => deletePlaylist(playlist.playlist_id).then(() => getPlaylists()) }
          >Delete</MatButton>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { getPlaylists, editPlaylist, deletePlaylist })(PlayCard);