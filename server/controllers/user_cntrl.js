const getUser = (req, res, next) => {
  const { id } = req.params;

  const db = req.app.get('db');

  db.get_user(id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send({ getUserError: err }));
}

const addUser = (req, res, next) => {
  const { username, email, country } = req.body;

  const db = req.app.get('db');

  db.add_user([username, email, country])
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send({ addUserError: err }));
}

module.exports = {
  getUser,
  addUser
}