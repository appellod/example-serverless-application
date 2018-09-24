import * as Postgres from "@example/postgres";

Postgres.connect({
  url: process.env.POSTGRES_URL
});
