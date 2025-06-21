const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: String,
  link: String,
  deadline: String,
  cartItems: Array,
  members: [String], // usernames or emails
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);