const Redis = require("ioredis").default;

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Redis Connected✅");
});

redisClient.on("error", (err) => {
  console.log("Redis Error ❌", err);
});

module.exports = redisClient;
