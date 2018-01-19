import { Mongoose } from "../mongoose";

process.env.NODE_ENV = "test";

// start the API server
const index = require("../");

beforeEach(async function() {
  // Reset the database
  await Mongoose.clear();

  // // Create a default test user
  // const user = await Mongoose.User.mock({ email: "test@example.com" });
  // await user.login();

  // // Create a default admin user
  // const admin = await Mongoose.User.mock({ email: "admin@example.com", level: 1 });
  // await admin.login();
});

export = { config: index.config, express: index.express, mongoose: index.mongoose };
