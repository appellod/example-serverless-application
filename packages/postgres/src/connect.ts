import * as Knex from "knex";
import { Model } from "objection";

export interface ConnectOptions {
  url: string;
}

export function connect(options: ConnectOptions) {
  const knex = Knex({
    client: "pg",
    connection: options.url
  });

  return Model.knex(knex);
}
