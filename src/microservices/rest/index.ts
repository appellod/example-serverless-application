import * as bluebird from "bluebird";
import * as passport from "koa-passport";
import * as Router from "koa-router";
import * as path from "path";

import { Koa } from "../../common/koa";
import * as Loggly from "../../common/loggly";
import * as Postgres from "../../common/postgres";
import * as Passport from "../../common/passport";
import { UsersRoutes } from "./routes";

// Use Bluebird promises for better performance.
global.Promise = bluebird;

// Setup Loggly if the necessary environment variables are set.
if (Loggly.isConfigured) {
  Loggly.setup();
}

// Connect to Postgres.
const knex = Postgres.setup();

// Create a KOA server.
const koa = new Koa(process.env.REST_SERVER_PORT);

// Setup our routers.
const v1Router = new Router({ prefix: "/v1" });
UsersRoutes(v1Router);

// Protect routes with passport
const router = new Router();
router.use(passport.authenticate("bearer", { session: false }), v1Router.routes());
koa.app.use(router.routes());

// Enable documentation.
const directory = path.resolve(__dirname, "documentation");
koa.enableDocumentation(directory);

// Setup Passport to allow route authentication.
Passport.setup(koa.app);

export { knex, koa };
