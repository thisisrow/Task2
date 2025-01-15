// controller to check alerts and send email notifications

const dotenv = require("dotenv");
dotenv.config();
const Alert = require("../models/alertModel");
const nodemailer = require('nodemailer');
const { fetchCryptoMarkets } = require("../services/cryptoService");
const { getCache, setCache } = require("../utils/cache"); // Import cache functions

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,  
  auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASSWORD    
  }
});

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
        // Send an email notification to the user
        const mailOptions = {
          from: process.env.EMAIL_USER,  
          to: alert.userEmail, 
          subject: 'Alert Message for Crypto prices matching', 
          text: `Alert triggered for ${alert.cryptoSymbol} (${alert.currency.toUpperCase()}): ` +
                    `Price is now ${crypto.current_price}, condition ${alert.condition} ${alert.targetPrice}`
        };
        
        // Send an email notification
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error('Error sending email:', error);
          }
        });
      }
    }
  } catch (error) {
    console.error("Error checking alerts:", error.message);
  }
};

module.exports = { checkAlerts };
