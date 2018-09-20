import * as Postgres from "../src/common/postgres";
import * as Redis from "../src/common/redis";

const knex = Postgres.setup();
const redis = Redis.connect();
