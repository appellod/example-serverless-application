process.env.NODE_ENV = "test";

import { Group, User } from "../mongoose";
import { Redis } from "../redis";

export * from "../";

beforeEach(async function() {
  // Reset the database
  await Promise.all([
    await Group.remove({}),
    await User.remove({})
  ]);

  // Reset Redis
  await new Promise((res) => Redis.client.flushdb(res));
});
