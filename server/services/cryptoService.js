const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const CACHE_TTL = 60000; // Cache data for 60 seconds

exports.fetchCryptoMarkets = async (currency) => {
  const cacheKey = `markets_${currency}`;
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    console.log(`Cache hit for currency: ${currency}`);
    return cachedData;
  }

  try {
    const response = await axios.get(API_URL, {
      params: { vs_currency: currency },
    });

    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL);
    return data;
  } catch (error) {
    console.error("Error fetching crypto markets:", error.message);
    throw new Error("Failed to fetch cryptocurrency markets");
  }
};
