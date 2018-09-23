import * as Redis from "../src";

const redis = Redis.connect({
  database: process.env.REDIS_DATABASE,
  url: process.env.REDIS_URL
});

beforeEach(async function() {
  await new Promise((res) => redis.flushdb(res));
});
