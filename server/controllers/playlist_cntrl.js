const getPlaylists = (req, res, next) => {
  const db = req.app.get('db');

  db.get_playlists()
    .then(playlists => res.status(200).send(playlists))
    .catch(err => res.status(500).send({ getPlaylistsError: err }));
}

module.exports = {
  getPlaylists
}