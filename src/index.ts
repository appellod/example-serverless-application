import * as bluebird from "bluebird";

import { Config } from "./config";
import { Express } from "./express";
import { Mongoose } from "./mongoose";
import { Passport } from "./passport";
import { SocketIO } from "./socket-io";

global.Promise = bluebird;

// Load environment
const environment = process.env.NODE_ENV || "local";
const config = new Config(environment);
if (config.environment !== "test") console.log("Using Environment: " + config.environment);

// Setup components
const express = new Express(config);
const mongoose = new Mongoose(config);
const passport = new Passport(config, express.app);
const socketIo = new SocketIO(express.server);

export = { config, express, mongoose, passport, socketIo };

// Create admin user if user doesn't exit, but only when running locally
if (config.environment === "local") {
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
