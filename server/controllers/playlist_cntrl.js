/* Playlist_cntrl contains all methods that deal with the playlists within the application */

// Gets list of playlists associated with the user's Spotify username
const getPlaylists = (req, res, next) => {
  const { username } = req.params;

  const db = req.app.get('db');

  db.get_playlists([username])
    .then(playlists => res.status(200).send(playlists))
    .catch(err => res.status(500).send({ getPlaylistsError: err }));
}

// Creates a playlist entry in database
const createPlaylist = (req, res, next) => {
  const { playlist_name, description, username } = req.body;

  const db = req.app.get('db');

  db.create_playlist([playlist_name, description, username])
    .then(playlist => res.status(200).send(playlist))
    .catch(err => res.status(500).send({ createPlaylistError: err }));
}

// Deletes a playlist within the database
const deletePlaylist = (req, res, next) => {
  const { id } = req.params;

  const db = req.app.get('db');

  db.delete_playlist(id)
    .then(playlist => res.status(200).send(playlist))
    .catch(err => res.status(500).send({ deletePlaylistError: err }));
}

// Edits a current playlist's description
const editPlaylistDescription = (req, res, next) => {
  const { id } = req.params;
  const { description } = req.body;

  const db = req.app.get('db');

  db.edit_playlist_description([description, id])
    .then(playlist => res.status(200).send(playlist))
    .catch(err => res.status(500).send({ editPlaylistDescriptionError: err }));
}

module.exports = {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  editPlaylistDescription
}