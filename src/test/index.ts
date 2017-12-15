import { Mongoose } from "@src/mongoose";

process.env.NODE_ENV = "test";

// start the API server
const index = require("../");

beforeEach(async function() {
  // Reset the database
  await Mongoose.clear();

  // Create a default test user
  const user = await Mongoose.User.mock({ email: "test@example.com" });
  await user.login();
});

export = { config: index.config, express: index.express, mongoose: index.mongoose };
