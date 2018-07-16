import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Search from './components/Search/Search';
import User from './components/User/User';
import Searched from './components/Searched/Searched';
import Playlists from './components/Playlists/Playlists';
import Playlist from './components/Playlists/Playlist/Playlist';
import Playground from './components/Playground/Playground';

export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/search" component={ Search } />
    <Route path="/searched" component={ Searched } />
    <Route exact path="/playlists" component={ Playlists } />
    <Route path="/playlists/playlist/:id" component={ Playlist } />
    <Route path="/user" component={ User } />
    <Route path="/playground" component={ Playground } />
  </Switch>
);