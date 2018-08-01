import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import {
  Button,
  Collapse,
  Well,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

import MatButton from '../minor_components/MatButton/MatButton';
import MatInput from '../minor_components/MatInput/MatInput';

import './Playground.css';

/*
 *  Playground component serves no real purpose towards the application
 *  All testing of new features were originally brought here to test the functionality before being implemented into other components
 */

const spotifyApi = new SpotifyWebApi();

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPlaying: { 
        name: 'Not Checked',
        albumArt: '',
        spotifyUri: '',
        open: false
      }
    }
  }

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        // console.log('response: ', response);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[1].url,
            spotifyUri: response.item.uri
          }
        });
      });
      // .then(console.log(this.state));
  }
  
  render() {
    const { country, email, username } = this.props;
    if (country && email && username) {
      console.log('props: ', this.props);
    };

    let baseUri = 'https://open.spotify.com/embed?uri=';
    let embedUri = baseUri + this.state.nowPlaying.spotifyUri;

    return (
      <div className="text">
        <h1 className="clear">Playground</h1>
        <div>
          <img className="album-art" src={ this.state.nowPlaying.albumArt }/>
        </div>
        <div>
          <h3>Now Playing: { this.state.nowPlaying.name }</h3>
        </div>
        <div>
          <iframe src={ embedUri } width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        <div>
          <MatButton
            classNames="button"
            clickButton={ () => this.getNowPlaying() }>

            Check Now Playing
          </MatButton>
        </div>
        <br />
        <br />
        <MatInput />
        <Button onClick={ () => this.setState({ open: !this.state.open }) }>Dropdown</Button>
        <Collapse in={this.state.open}>
          <div>
            <Well className="well ">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Well>
          </div>
        </Collapse>
        <br />
        <DropdownButton>
          <MenuItem>Test</MenuItem>
        </DropdownButton>
        <br />
        <div className="ui action input">
          <input type="text" placeholder="Search..." />
          <button className="ui icon button">
            <i className="search icon"></i>
          </button>
        </div>
        <br />
        <div class="ui icon input">
          <input type="text" placeholder="Search..." />
          <i class="circular search link icon"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    country: state.country,
    email: state.email,
    username: state.username
  }
}

export default connect(mapStateToProps)(Playground);