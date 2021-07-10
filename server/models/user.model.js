const mongoose = require('mongoose');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    bio: String,
    password: String,
  })
);

module.exports = User;
