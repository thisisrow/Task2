const Alert = require('../models/alertModel');
const { fetchCryptoPrice } = require('../services/priceService');

exports.createAlert = async (req, res) => {
  try {
    const { userEmail, cryptoSymbol, targetPrice, isAbove } = req.body;
    const newAlert = await Alert.create({ userEmail, cryptoSymbol, targetPrice, isAbove });
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCryptoPrice = async (req, res) => {
  try {
    const price = await fetchCryptoPrice(req.params.cryptoId);
    res.status(200).json({ crypto: req.params.cryptoId, price });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
