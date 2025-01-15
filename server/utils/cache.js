const cache = new Map();

// Set a cache entry with a specific key, value, and TTL (time-to-live)
exports.setCache = (key, value, ttl) => {
  const expiry = Date.now() + ttl; // Calculate the expiry time based on TTL
  cache.set(key, { value, expiry }); // Store the value and expiry time in the cache
};

// Retrieve the cache entry for a given key
exports.getCache = (key) => {
  const cached = cache.get(key);
  
  // If the cache is still valid (not expired), return the cached value
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  
  // If cache is expired or doesn't exist, delete the entry and return null
  cache.delete(key);
  return null;
};
