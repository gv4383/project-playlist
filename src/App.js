import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import store from './redux/store';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <HashRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">MusicSquirrel</h1>
            </header>
            { routes }
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
