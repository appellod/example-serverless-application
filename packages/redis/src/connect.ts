import * as IoRedis from "ioredis";

let connection: IoRedis.Redis;

export interface ConnectOptions {
  database: number | string;
  url: string;
}

export function connect(options: ConnectOptions) {
  if (connection) {
    return connection;
  }

  connection = new IoRedis(options.url);

  const database = Number(options.database);
  connection.select(database);

  connection.on("error", console.error);

  return connection;
}
