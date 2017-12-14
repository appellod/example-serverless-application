import * as bluebird from "bluebird";

import { Config } from "./config/config";
import { Express } from "./lib/express";
import { Mongoose } from "./lib/mongoose";
import { Passport } from "./lib/passport";

global.Promise = bluebird;

// Load environment
const environment = process.env.NODE_ENV || "local";
const config = new Config(environment);
if (config.environment !== "test") console.log("Using Environment: " + config.environment);

// Setup components
const express = new Express(config);
const mongoose = new Mongoose(config);
const passport = new Passport(config, express.app);

export = { config, express, mongoose, passport };

// Create admin user if user doesn't exit, but only when running locally
if (config.environment !== "local") {
  Mongoose.User.update({
    email: "test@example.com"
  }, {
    email: "test@example.com",
    level: 1,
    password: Mongoose.User.getPasswordHash("password")
  }, {
    new: true,
    upsert: true
  }, (err, user) => {
    if (err) console.error(err);
  });
}
