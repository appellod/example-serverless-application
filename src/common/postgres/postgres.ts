import * as Knex from "knex";
import { Model } from "objection";

export function setup() {
  const knex = Knex({
    client: "pg",
    connection: process.env.POSTGRES_URL
  });

  return Model.knex(knex);
}
