// services/priceService.js


const fetch = require('node-fetch');
const { getCache, setCache } = require('../utils/cache'); // Ensure this path is correct

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const API_KEY = 'CG-u9mxa7K1n45Usrs4mTjdrQkA';

exports.fetchCryptoPrice = async (cryptoId) => {
  const cacheKey = `price_${cryptoId}`;
  const cachedPrice = getCache(cacheKey); // Check cache for price

  if (cachedPrice) {
    console.log(`Cache hit for ${cryptoId}: $${cachedPrice}`);
    return cachedPrice; // Return cached value
  }

  try {
    const url = `${API_URL}?ids=${cryptoId}&vs_currencies=usd`;
    console.log(`Fetching from API: ${url}`);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': API_KEY,
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`API Error: ${errorDetails}`);
      throw new Error(`Error fetching price: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    const price = data[cryptoId]?.usd || null;

    if (price) {
      setCache(cacheKey, price, 60000); // Cache the price for 60 seconds
      console.log(`Cache set for ${cryptoId}: $${price}`);
    } else {
      console.warn(`Price not found in API response for ${cryptoId}`);
    }

    return price;
  } catch (error) {
    console.error('Error in fetchCryptoPrice:', error.message);
    throw error;
  }
};
