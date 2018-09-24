import * as Postgres from "../src";

Postgres.connect({
  url: process.env.POSTGRES_URL
});

beforeEach(async function() {
  await Promise.all([
    // Reset Postgres
    Postgres.User.query().delete()
  ]);
});
