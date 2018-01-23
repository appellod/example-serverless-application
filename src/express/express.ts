import * as bodyParser from "body-parser";
import * as connectMongo from "connect-mongo";
import * as cors from "cors";
import * as express from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import * as session from "express-session";
import * as fs from "fs";
import * as http from "http";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as path from "path";

import { Config } from "../config";
import { AuthenticationRouter, UsersRouter } from "./";

export class Express {
  public app: express.Application;
  public server: http.Server;

  constructor(config: Config) {
    this.app = express();

    if (config.environment !== "test") {
      this.app.use(morgan("dev"));
    }

    this.app.use(cors());
    this.app.disable("x-powered-by");

    this.setupBodyParser();
    this.setupMongoSessionMiddleware();
    this.setupQueryStringJsonParser();
    this.setupRoutes();

    this.server = this.app.listen(config.server.port, (err: any) => {
      if (err) console.error(err);

      if (config.environment !== "test") console.log("Express server running on port " + config.server.port + ".");
    });
  }

  /**
   * Catches any errors thrown within Promises (async/await blocks).
   * @param fn The route function to guard.
   */
  public static handler(fn: (req: express.Request, res: express.Response) => Promise<any>): any {
    return async (req: express.Request, res: express.Response) => {
      try {
        const results = await fn.call(this, req, res);
        res.json(results);
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    };
  }

  /**
   * Sets up body parser so we can access req.body in controllers
   */
  private setupBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
  }

  /**
   * Sets up Mongo to be used as a session store for API documentation.
   */
  private setupMongoSessionMiddleware() {
    const MongoStore = connectMongo(session);
    const sessionMiddleware = session({
      secret: "youll never guess this teehee",
      saveUninitialized: true,
      resave: true,
      store: new MongoStore({
        collection: "sessions",
        mongooseConnection: mongoose.connection
      })
    });
    this.app.use(sessionMiddleware);
  }

  /**
   * Parses the query string"s "query" value into JSON
   */
  private setupQueryStringJsonParser() {
    this.app.use((req, res, next) => {
      if (req.query && req.query.query) {
        try {
          req.query = JSON.parse(req.query.query);
          return next();
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      } else {
        return next();
      }
    });
  }

  /**
   * Loads route files and registers them with Express.
   */
  private setupRoutes() {
    const router = express.Router();
    this.app.use("/v1", router);

    const authenticationRoutes = new AuthenticationRouter(router);
    const usersRoutes = new UsersRouter(router);
  }
}
