import { Application, Router } from "@example/azura";
import * as Loggly from "@example/loggly";
import * as Postgres from "@example/postgres";
import * as bluebird from "bluebird";

// import * as Loggly from "../../common/loggly";

import { errorMiddleware, queryToJsonMiddleware } from "./middleware";
import * as authenticationRoutes from "./routes/authentication";
import * as usersRoutes from "./routes/users";

// Use Bluebird promises for better performance.
global.Promise = bluebird;

// Setup Loggly if the necessary environment variables are set.
const inputToken = process.env.LOGGLY_INPUT_TOKEN;
const subdomain = process.env.LOGGLY_SUBDOMAIN;
const tags = process.env.LOGGLY_TAGS;
if (inputToken && subdomain && tags) {
  Loggly.start({ inputToken, subdomain, tags: tags.split(",") });
}

// Connect to Postgres.
Postgres.connect({
  url: process.env.POSTGRES_URL
});

// Create a new serverless application.
const app = new Application();
app.use(errorMiddleware);
app.use(queryToJsonMiddleware);

// Register API routes.
const apiRouter = new Router();
authenticationRoutes.init(apiRouter);
usersRoutes.init(apiRouter);
app.use(apiRouter.routes());

module.exports = app.listen();
