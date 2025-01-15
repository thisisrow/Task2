const cache = new Map();

exports.setCache = (key, value, ttl) => {
  const expiry = Date.now() + ttl;
  cache.set(key, { value, expiry });
};

exports.getCache = (key) => {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  cache.delete(key);
  return null;
};
