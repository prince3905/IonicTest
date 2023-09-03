const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  profile: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
