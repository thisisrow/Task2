// models/alertModel.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  cryptoSymbol: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  condition: { type: String, enum: ["above", "below"], required: true },
  currency: { type: String, default: "usd" },
  isTriggered: { type: Boolean, default: false },
});

module.exports = mongoose.model("Alert", alertSchema);
