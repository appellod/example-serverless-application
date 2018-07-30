import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import * as http from "http";
import * as koa from "koa";
import * as koaStatic from "koa-static";
import * as mongoose from "mongoose";
import * as MongooseStore from "koa-session-mongoose";
import * as morgan from "koa-morgan";
import * as path from "path";
import * as Router from "koa-router";
import * as session from "koa-session";

import { AuthenticationRouter, GroupsRouter, UsersRouter } from "./";
import { errorMiddleware, queryStringJsonParserMiddleware } from "./";

export class Koa {
  public app: koa;
  public server: http.Server;

  constructor() {
    this.app = new koa();

    if (process.env.ENVIRONMENT !== "test") {
      this.app.use(morgan("dev"));
    }

    // Allow CORS requests.
    this.app.use(cors());

    // Sets up body parser so we can access req.body in controllers.
    this.app.use(bodyParser({ jsonLimit: "50mb" }));

    // Setup our MongoDB session store for API documentation logins.
    this.app.keys = ['this is a secret key for the sessions'];
    const mongooseStore = new MongooseStore({ 
      collection: "sessions", 
      name: `Session-${Date.now()}` // Append date to model name to allow mocha --watch
    });
    const mongoSession = session({ store: mongooseStore }, this.app);
    this.app.use(mongoSession);

    // Setup our middleware.
    this.app.use(errorMiddleware);
    this.app.use(queryStringJsonParserMiddleware);

    // Setup routes.
    this.app.use(koaStatic(path.resolve(__dirname, "views")));
    this.setupRouters();

    this.server = this.app.listen(process.env.SERVER_PORT, () => {
      if (process.env.ENVIRONMENT !== "test") {
        console.log("Koa server running on port " + process.env.SERVER_PORT + ".");
      }
    });
  }

  /**
   * Load routers and register them with Koa.
   */
  private setupRouters() {
    const router = new Router({ prefix: "/v1" });

    new AuthenticationRouter(router);
    new GroupsRouter(router);
    new UsersRouter(router);

    this.app.use(router.routes());
  }
}
