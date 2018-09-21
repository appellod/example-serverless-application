import * as bluebird from "bluebird";

import * as Loggly from "../../common/loggly";
import * as Postgres from "../../common/postgres";
import {
  Application,
  Router,
  serve,

  errorMiddleware,
  queryToJsonMiddleware,
} from "../../common/serverless";
import * as authenticationRoutes from "./routes/authentication";
import * as usersRoutes from "./routes/users";

// Use Bluebird promises for better performance.
global.Promise = bluebird;

// Setup Loggly if the necessary environment variables are set.
if (Loggly.isConfigured) {
  Loggly.setup();
}

// Connect to Postgres.
Postgres.setup();

// Create a new serverless application.
const app = new Application();
app.use(errorMiddleware);
app.use(queryToJsonMiddleware);

// Register API routes.
const apiRouter = new Router();
authenticationRoutes.init(apiRouter);
usersRoutes.init(apiRouter);
app.use(apiRouter.routes());

// Setup API documentation.
const staticMiddleware = serve({ root: __dirname + "/documentation" });
app.use(staticMiddleware);

module.exports = app.listen();
