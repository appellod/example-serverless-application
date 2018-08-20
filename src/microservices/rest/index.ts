import * as bluebird from "bluebird";
import * as Router from "koa-router";
import * as path from "path";

import { Koa } from "../../common/koa";
import * as Loggly from "../../common/loggly";
import { Mongo } from "../../common/mongo";
import * as Passport from "../../common/passport";
import { GroupsRoutes, UsersRoutes } from "./routes";

// Use Bluebird promises for better performance.
global.Promise = bluebird;

// Setup Loggly if the necessary environment variables are set.
if (Loggly.isConfigured) {
  Loggly.setup();
}

// Connect to Mongo.
const mongo = new Mongo();

// Create a KOA server.
const koa = new Koa(process.env.REST_SERVER_PORT);

// Setup our routes.
const router = new Router({ prefix: "/v1" });
GroupsRoutes(router);
UsersRoutes(router);
koa.app.use(router.routes());

// Enable documentation.
const directory = path.resolve(__dirname, "documentation");
koa.enableDocumentation(directory);

// Setup Passport to allow route authentication.
Passport.setup(koa.app);

export { koa };
