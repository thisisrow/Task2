// utils/cache.js
const cache = new Map();

exports.setCache = (key, value, ttl) => {
  cache.set(key, { value, expiry: Date.now() + ttl });
};

exports.getCache = (key) => {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  cache.delete(key);
  return null;
};
