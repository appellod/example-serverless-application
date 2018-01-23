import { Mongoose } from "../mongoose";

process.env.NODE_ENV = "test";

// start the API server
const index = require("../");

beforeEach(async function() {
  // Reset the database
  await Mongoose.clear();
});

export = { config: index.config, express: index.express, mongoose: index.mongoose };
