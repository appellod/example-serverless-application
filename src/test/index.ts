process.env.NODE_ENV = "test";

import { Group, User } from "../mongoose";
import { Redis } from "../redis";

// start the API server
const index = require("../");

beforeEach(async function() {
  // Reset the database
  await Promise.all([
    await Group.remove({}),
    await User.remove({})
  ]);

  // Reset Redis
  await new Promise((res) => Redis.client.flushdb(res));
});

export = {
  koa: index.koa,
  mongoose: index.mongoose
};
