const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect();

module.exports = redisClient;
