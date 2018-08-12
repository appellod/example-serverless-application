require("source-map-support").install();

import * as bluebird from "bluebird";

import { Documentation } from "./documentation";
import { Koa } from "./koa";
import { Loggly } from "./loggly";
import { Mongoose, Token, User } from "./mongoose";
import { Passport } from "./passport";
import { Redis } from "./redis";
import { SocketIo } from "./socketIo";

global.Promise = bluebird;

// Load environment
process.env.NODE_ENV = process.env.NODE_ENV || "local";
if (process.env.ENVIRONMENT !== "test") console.log("Using Environment: " + process.env.ENVIRONMENT);

// Setup components
new Loggly();
const mongoose = new Mongoose();
const koa = new Koa();
const documentation = new Documentation(koa.app);
const passport = new Passport(koa.app);
new Redis();

const pubClient = Redis.create();
const subClient = Redis.create();
const socketIo = new SocketIo(pubClient, koa.server, subClient);

export { documentation, koa, mongoose, passport, socketIo };

// Create admin user if user doesn't exit, but only when running locally
if (process.env.ENVIRONMENT === "local") {
  User.findOneAndUpdate({
    email: "test@example.com"
  }, {
    email: "test@example.com",
    level: 1,
    password: User.getPasswordHash("password")
  }, {
    new: true,
    upsert: true
  }, async (err, user) => {
    if (err) console.error(err);

    Token.create({ userId: user._id });
  });
}
