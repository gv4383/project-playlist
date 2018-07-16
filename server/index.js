/****** LOCAL SERVER ******/
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session')

const song_cntrl = require('./controllers/song_cntrl');
const playlist_cntrl = require('./controllers/playlist_cntrl');

// Sets app as local server
const app = express();

app.use(json());
app.use(cors());

// Allows local server to utilize SQL commands within db folder
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
}).catch(err => console.log(err));

// Allows application to be utilized by multiple users
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// Gets list of songs stored in the database
app.get('/api/songs', song_cntrl.getSongs);

// Adds a song associated with a playlist to the database
app.post('/api/songs', song_cntrl.addSongs);


// Gets list of playlists stored in the database
app.get('/api/playlists', playlist_cntrl.getPlaylists);

// Creates new playlist entry
app.post('/api/playlists', playlist_cntrl.createPlaylist);

// Deletes a playlist entry
app.delete('/api/playlists/:id', playlist_cntrl.deletePlaylist);

// Edits a playlist's description
app.put('/api/playlists/:id', playlist_cntrl.editPlaylistDescription);

// Runs the server on localhost:3001
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port: ${ port }`) });