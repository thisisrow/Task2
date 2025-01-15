const Alert = require("../models/alertModel");
const { fetchCryptoMarkets } = require("../services/cryptoService");
const { getCache, setCache } = require("../utils/cache"); // Import cache functions

// This function will check each alert condition
const checkAlerts = async () => {
  try {
    const alerts = await Alert.find({ isTriggered: false }); // Get all alerts that have not been triggered

    const currencyAlertsMap = new Map();

    for (let alert of alerts) {
      // Check cache first
      let marketData = getCache(`markets_${alert.currency}`);
      
      // If the market data is not in cache, fetch from the API and store in cache
      if (!marketData) {
        console.log(`Cache miss for ${alert.currency}`);
        marketData = await fetchCryptoMarkets(alert.currency);
        setCache(`markets_${alert.currency}`, marketData, 60000); // Store in cache for 60 seconds
      } else {
        console.log(`Cache hit for ${alert.currency}`);
      }

      // Find the crypto from the fetched or cached market data
      const crypto = marketData.find((item) => item.symbol === alert.cryptoSymbol.toLowerCase());

      if (!crypto) continue; // Skip if no data for the specific cryptocurrency

      let isConditionMet = false;

      // Compare the current price with the target price based on the condition (above or below)
      if (alert.condition === "above" && crypto.current_price > alert.targetPrice) {
        isConditionMet = true;
      } else if (alert.condition === "below" && crypto.current_price < alert.targetPrice) {
        isConditionMet = true;
      }

      if (isConditionMet) {
        // Trigger the alert if the condition is met
        alert.isTriggered = true;
        await alert.save(); // Save the alert as triggered

        // Log the alert (replace with email or other notification later)
        console.log(`Alert triggered for ${alert.cryptoSymbol} (${alert.currency.toUpperCase()}): ` +
                    `Price is now ${crypto.current_price}, condition ${alert.condition} ${alert.targetPrice}`);
      }
    }
  } catch (error) {
    console.error("Error checking alerts:", error.message);
  }
};

module.exports = { checkAlerts };
