const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  description: String,
  role: {
    type: String,
    enum: ['hiker', 'restaurant']
  }
  
});

module.exports = mongoose.model('user', userSchema);