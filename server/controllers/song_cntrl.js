const getSongs = (req, res, next) => {
  const db = req.app.get('db');
  let {id} =  req.params;
  db.get_songs([id])
  
    .then(songs => res.status(200).send(songs))
    .catch(err => res.status(500).send({ getSongsError: err }));
}

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