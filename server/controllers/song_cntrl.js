const getSongs = (req, res, next) => {
  const db = req.app.get('db');

  db.get_songs()
    .then(songs => res.status(200).send(songs))
    .catch(err => res.status(500).send({ getSongsError: err }));
}

const addSongs = (req, res, next) => {
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

module.exports = {
  getSongs,
  addSongs
}