import * as Postgres from "../src/common/postgres";
import * as Redis from "../src/common/redis";

const knex = Postgres.setup();
const redis = Redis.connect();

beforeEach(async function() {
  // Reset Postgres
  await Promise.all([
    Postgres.User.query().delete()
  ]);

  // Reset Redis
  await new Promise((res) => redis.flushdb(res));
});
