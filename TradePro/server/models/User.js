const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: Number, default: 50000 },
  portfolio: [{
    symbol: String,
    quantity: Number,
    avgPrice: Number
  }]
});

module.exports = mongoose.model('User', UserSchema);