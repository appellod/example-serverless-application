import { createClient, RedisClient } from "redis";

export class Redis {
  public static client: RedisClient;

  constructor() {
    Redis.client = Redis.create();
  }

  public static create() {
    const client = createClient(process.env.REDIS_URL);

    const database = Number(process.env.REDIS_DATABASE);
    client.select(database);

    client.on("error", console.error);

    return client;
  }
}
