import * as Postgres from "@example/postgres";

Postgres.connect({
  url: process.env.POSTGRES_URL
});

beforeEach(async function() {
  await Promise.all([
    Postgres.User.query().delete()
  ]);
});
