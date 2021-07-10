const db = require('../models/index');
const User = db.user;

const userChats = (req, res) => {
  res.status(200).send({
    message: 'User chats',
  });
};

const userInfo = (req, res) => {
  let userId = req.headers['id'];

  User.findOne({
    _id: userId
  }).exec((err, user) => {
    if (err) {
      return res.send(500).send({
        message: err,
      });
    }

    return res.status(200).send({
      username: user.username,
      bio: user.bio,
    })
  });
}

module.exports = {
  userChats,
  userInfo,
}
