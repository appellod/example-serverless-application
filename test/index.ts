import * as Postgres from "../src/common/postgres";
import * as Redis from "../src/common/redis";

const knex = Postgres.setup();
const redis = Redis.connect();

beforeEach(async function() {
  await Promise.all([
    // Reset Postgres
    Postgres.User.query().delete(),

    // Reset Redis
    new Promise((res) => redis.flushdb(res))
  ]);
});
