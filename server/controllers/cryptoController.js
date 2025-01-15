const Alert = require("../models/alertModel");
const { fetchCryptoMarkets } = require("../services/cryptoService");

exports.getCryptoData = async (req, res) => {
  const { currency = "usd" } = req.query; // Default currency is USD

  try {
    const data = await fetchCryptoMarkets(currency);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getCryptoData:", error.message);
    res.status(500).json({ message: "Failed to fetch cryptocurrency data" });
  }
};
