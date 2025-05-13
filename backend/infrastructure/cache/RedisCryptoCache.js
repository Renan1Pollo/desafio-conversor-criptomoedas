const redisClient = require('../../config/redis');

class RedisCryptoCache {
  constructor(ttlSeconds = 600) {
    this.ttl = ttlSeconds;
  }

  async getCachedCryptos(currency) {
    const cached = await redisClient.get(`cryptos:${currency}`);
    return cached ? JSON.parse(cached) : null;
  }

  async setCachedCryptos(currency, data) {
    await redisClient.setEx(`cryptos:${currency}`, this.ttl, JSON.stringify(data));
  }
}

module.exports = RedisCryptoCache;
