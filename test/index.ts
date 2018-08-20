import { Group, Mongo, User } from "../src/common/mongo";
import * as Postgres from "../src/common/postgres";
import { Redis } from "../src/common/redis";

const knex = Postgres.setup();
const mongo = new Mongo();
const redis = Redis.create();

beforeEach(async function() {
  // Reset Mongo
  await Promise.all([
    Group.remove({}),
    User.remove({})
  ]);

  // Reset Postgres
  await Promise.all([
    Postgres.User.query().delete()
  ]);

  // Reset Redis
  await new Promise((res) => redis.flushdb(res));
});
