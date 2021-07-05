const db = require('../models/index');

const checkUsernameOrEmail = (req, res, next) => {
  db.user.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });

    }

    if (user) {
      return res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
    }

    db.user.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({
          message: err,
        });
      }

      if (user) {
        return res.status(400).send({
          message: 'Failed! Email is already in use!',
        });
      }

      next();
    });
  });
};

module.exports = checkUsernameOrEmail;
