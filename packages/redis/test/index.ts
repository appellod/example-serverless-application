import * as Redis from "../src";

const redis = Redis.connect({
  database: Number(process.env.REDIS_DATABASE),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
  tls: process.env.REDIS_TLS === "true"
});

beforeEach(async function() {
  await new Promise((res) => redis.flushdb(res));
});
