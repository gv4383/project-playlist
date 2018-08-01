/* Song_cntrl contains all methods that deal with individual songs within the application */

// Gets a list of songs associated with a specific playlist id
const getSongs = (req, res, next) => {
  const db = req.app.get('db');
  let {id} =  req.params;
  db.get_songs([id])
  
    .then(songs => res.status(200).send(songs))
    .catch(err => res.status(500).send({ getSongsError: err }));
}

// Adds a song to the songs table in database
// Each song entry is associated to a specific playlist id
const addSong = (req, res, next) => {
  const {
    spotify_uri,
    song_name,
    artist,
    album,
    album_art,
    playlist_id
  } = req.body;

  const db = req.app.get('db');

  db.add_song([spotify_uri, song_name, artist, album, album_art, playlist_id])
    .then(song => res.status(200).send(song))
    .catch(err => res.status(500).send({ addSongError: err }));
}

// removes a song from a playlist by deleting the entry within the database
const removeSong = (req, res, next) => {
  const { id } = req.params;

  const db = req.app.get('db');

  db.remove_song(id)
    .then(song => res.status(200).send(song))
    .catch(err => res.status(500).send({ removeSongError: err }));
}

module.exports = {
  getSongs,
  addSong,
  removeSong
}