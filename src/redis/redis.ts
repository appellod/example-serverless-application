import { createClient } from "redis";

const redis = createClient(process.env.REDIS_URL);

const database = Number(process.env.REDIS_DATABASE);
redis.select(database);

redis.on("error", console.error);

export { redis };
