process.env.NODE_ENV = "test";

import { Group, Token, User } from "../mongoose";

// start the API server
const index = require("../");

beforeEach(async function() {
  // Reset the database
  await Promise.all([
    await Group.remove({}),
    await Token.remove({}),
    await User.remove({})
  ]);
});

export = {
  express: index.express,
  mongoose: index.mongoose
};
