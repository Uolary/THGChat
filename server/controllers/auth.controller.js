const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;
const RefreshToken = db.refreshToken;

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    bio: req.body.bio,
    password: bcrypt.hashSync(req.body.password, 8),
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

const signin = async (req, res) => {
  User.findOne({
    username: req.body.username,
  }).populate('roles', '-__v')
    .exec(async (err, user) => {
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
          id: user.id,
        },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        },
      );

      let refreshToken = await RefreshToken.createToken(user);

      return res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({
      message: 'Refresh Token is required!',
    });
  }

  try {
    let refreshToken = await RefreshToken.findOneAndDelete({
      token: requestToken
    });

    if (!refreshToken) {
      return res.status(403).send({
        message: 'Refresh token is not in database!',
      });
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      await RefreshToken.findByIdAndRemove(
        refreshToken._id,
        {
          useFindAndModify: false
        }
      ).exec();

      return res.status(403).send({
        message: 'Refresh token was expired. Please make a new sign request!',
      });
    }

    User.findOne({
      _id: refreshToken.user._id,
    }).exec(async (err, user) => {
      console.log('user', user);

      let newRefreshToken = await RefreshToken.createToken(user);

      let newAccessToken = jwt.sign(
        {
          id: refreshToken.user._id,
        },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        }
      );

      return res.status(200).send({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: err,
    });
  }
};

module.exports = {
  signup,
  signin,
  refreshToken,
};
