const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    }

    user.save((err) => {
      if (err) {
        return res.status(500).send({
          message: err,
        });
      }

      res.send({
        message: 'User was registered successfully',
      });
    });
  })
};

const signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    }

    if (!user) {
      return res.status(404).send({
        message: 'User Not Found',
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      config.secret,
      {
        expiresIn: 86400
      },
    );

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};

module.exports = {
  signup,
  signin,
}
