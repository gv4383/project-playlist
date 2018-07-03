const getSongs = (req, res, next) => {
  const db = req.app.get('db');

  db.get_songs()
    .then(songs => res.status(200).send(songs))
    .catch(err => res.status(500).send({ getSongsError: err }));
}

module.exports = {
  getSongs
}