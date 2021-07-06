const db = require('../models/index');
const User = db.user;

module.exports.userChats = (req, res) => {
  res.status(200).send({
    message: 'User chats',
  });
};
