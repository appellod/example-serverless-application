import * as IoRedis from "ioredis";

let connection: IoRedis.Redis;

export function connect() {
  if (connection) {
    return connection;
  }

  connection = new IoRedis(process.env.REDIS_URL);

  const database = Number(process.env.REDIS_DATABASE);
  connection.select(database);

  connection.on("error", console.error);

  return connection;
}
