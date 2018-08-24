import * as bluebird from "bluebird";
import * as Router from "koa-router";
import * as path from "path";

import { Koa } from "../../common/koa";
import * as Loggly from "../../common/loggly";
import * as Postgres from "../../common/postgres";
import * as Passport from "../../common/passport";
import { AuthenticationRoutes } from "./routes";

// Use Bluebird promises for better performance.
global.Promise = bluebird;

// Setup Loggly if the necessary environment variables are set.
if (Loggly.isConfigured) {
  Loggly.setup();
}

// Connect to Postgres.
const knex = Postgres.setup();

// Create a KOA server.
const koa = new Koa(process.env.AUTHENTICATION_SERVER_PORT);

// Setup our routes.
const router = new Router({ prefix: "/v1" });
AuthenticationRoutes(router);
koa.app.use(router.routes());

// Enable documentation.
const directory = path.resolve(__dirname, "documentation");
koa.enableDocumentation(directory);

// Setup Passport to allow route authentication.
Passport.setup(koa.app);

export { knex, koa };
