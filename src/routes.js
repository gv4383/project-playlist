import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import User from './components/User/User';
import Search from './components/Search/Search';
import Playlists from './components/Playlists/Playlists';
import Playlist from './components/Playlists/Playlist/Playlist';

export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/user" component={ User } />
    <Route exact path="/playlists" component={ Playlists } />
    <Route path="/playlists/playlist" component={ Playlist } />
    <Route path="/search" component={ Search } />
  </Switch>
);