import * as IoRedis from "ioredis";

let connection: IoRedis.Redis;

export interface ConnectOptions {
  database: number;
  host: string;
  password: string;
  port: number;
  tls: boolean;
}

export function connect(options: ConnectOptions) {
  if (connection) {
    return connection;
  }

  connection = new IoRedis({
    host: options.host,
    password: options.password,
    port: options.port,
    tls: options.tls as any
  });

  const database = options.database;
  connection.select(database);

  connection.on("error", console.error);

  return connection;
}
