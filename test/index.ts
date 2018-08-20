import { Group, Mongoose, Token, User } from "../src/common/mongo";
import { Redis } from "../src/common/redis";

const mongoose = new Mongoose();
const redis = Redis.create();

beforeEach(async function() {
  // Reset the database
  await Promise.all([
    await Group.remove({}),
    await Token.remove({}),
    await User.remove({})
  ]);

  // Reset Redis
  await new Promise((res) => redis.flushdb(res));
});
