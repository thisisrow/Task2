//alertModel.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  cryptoSymbol: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  isAbove: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
