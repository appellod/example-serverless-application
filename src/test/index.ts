process.env.NODE_ENV = "test";

import { Group, Token, User } from "../mongoose";
import { Redis } from "../redis";

const index = require("../");
const redis = new Redis();

beforeEach(async function() {
  // Reset the database
  await Promise.all([
    await Group.remove({}),
    await Token.remove({}),
    await User.remove({})
  ]);

  // Reset Redis
  await new Promise((res) => Redis.client.flushdb(res));
});
