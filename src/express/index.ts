import * as bodyParser from "body-parser";
import * as connectMongo from "connect-mongo";
import * as cors from "cors";
import * as ejs from "ejs";
import * as express from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import * as session from "express-session";
import * as fs from "fs";
import * as http from "http";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as path from "path";

import { Config } from "../config";
import { AuthenticationRoutes } from "./routes/authentication";
import { DocumentationController } from "./documentation";
import { UsersRoutes } from "./routes/users";

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
    this.setupDocumentation();
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
  public static handler(fn: (req: express.Request, res: express.Response) => Promise<RequestHandlerParams>): RequestHandlerParams {
    return (req: express.Request, res: express.Response) => {
      fn(req, res)
        .then((results: any) => {
          res.json(results);
        })
        .catch((err: Error) => {
          res.status(400).json({ error: err.message });
        });
    };
  }

  /**
   * Sets up body parser so we can access req.body in controllers
   */
  private setupBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({limit: "50mb"}));
  }

  /**
   * Sets up documentation static files.
   */
  private setupDocumentation() {
    this.app.use(express.static(path.resolve(__dirname, "public")));
    this.app.set("views", path.resolve(__dirname, "public"));
    this.app.set("view engine", "html");
    this.app.engine("html", ejs.renderFile);
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

    const documentationController = new DocumentationController(this.app);

    const authenticationRoutes = new AuthenticationRoutes(router);
    const usersRoutes = new UsersRoutes(router);
  }
}
