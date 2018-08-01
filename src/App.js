import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Collapse } from 'react-bootstrap';

import routes from './routes';
import store from './redux/store';
import Navbar from './components/Navbar/Navbar';

import menu from './round_menu_white_24dp.png';
import headset from './headset_white_24dp.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  render() {

    return (
      <Provider store={ store }>
        <HashRouter>
          <div className="App">
            <div className="menu-bar">
              <Link className="inside-bar" id="link" to="/search">      {/*****************************************************/}
                <div className="logo">                                  {/*                                                   */}
                  <h3>Sound<img src={ headset } />Skwerl</h3>           {/* Logo - Navigates back to search page when clicked */}
                </div>                                                  {/*                                                   */}
              </Link>                                                   {/*****************************************************/}

              {/* Menu button - opens drop-down menu when clicked */}
              <img className="inside-bar" id="menu-button" src={ menu } alt="menu" onClick={ () => this.setState({
                open: !this.state.open
              }) } />
            </div>

            {/* Brings in a collapsable drop-down menu */}
            <Collapse in={ this.state.open }>
              <div>
                <Navbar />
              </div>
            </Collapse>
            { routes }
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
