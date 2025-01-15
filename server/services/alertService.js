const Alert = require("../models/alertModel");
const { fetchCryptoPrice } = require("./cryptoService");

const checkAlerts = async () => {
  try {
    const alerts = await Alert.find({ isTriggered: false });
    for (const alert of alerts) {
      const price = await fetchCryptoPrice(alert.cryptoSymbol, alert.currency);

      if (
        (alert.condition === "above" && price > alert.targetPrice) ||
        (alert.condition === "below" && price < alert.targetPrice)
      ) {
        console.log(`Alert triggered for ${alert.cryptoSymbol}: ${price}`);

        // Mark alert as triggered
        alert.isTriggered = true;
        await alert.save();

        // Add notification logic here (e.g., send an email or WebSocket message)
      }
    }
  } catch (error) {
    console.error("Error checking alerts:", error.message);
  }
};

// Schedule the function to run every minute
const startAlertService = () => {
  console.log("Starting alert service...");
  setInterval(checkAlerts, 60000); // Run every 60 seconds
};

module.exports = { startAlertService };
