import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import * as fs from "fs";
import * as http from "http";
import * as morgan from "morgan";
import * as path from "path";

import { Config } from "../config";
import { AuthenticationRouter, UsersRouter } from "./";
import { mongoSessionStoreMiddleware, queryStringJsonParserMiddleware } from "./";

export class Express {
  public app: express.Application;
  public server: http.Server;

  constructor(config: Config) {
    this.app = express();

    if (config.environment !== "test") {
      this.app.use(morgan("dev"));
    }

    // Allow CORS requests
    this.app.use(cors());

    // Disables the "x-powered-by" response header so users don't know we use Express
    this.app.disable("x-powered-by");

    // Sets up body parser so we can access req.body in controllers
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));

    // Sets up Mongo to store our user web sessions
    this.app.use(mongoSessionStoreMiddleware);

    // Parses the query string's "query" value into an object from JSON
    this.app.use(queryStringJsonParserMiddleware);

    this.app.use(express.static(path.resolve(__dirname, "views")));
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
   * Loads route files and registers them with Express.
   */
  private setupRoutes() {
    const router = express.Router();
    this.app.use("/v1", router);

    const authenticationRoutes = new AuthenticationRouter(router);
    const usersRoutes = new UsersRouter(router);
  }
}
