import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as ejs from "ejs";
import * as express from "express";
import * as fs from "fs";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as path from "path";
import * as session from "express-session";
import * as connectMongo from "connect-mongo";

import { Config } from "../config/config";
import { AuthenticationController } from "../controllers/authentication";
import { DocumentationController } from "../controllers/documentation";
import { UsersController } from "../controllers/users";

export class Express {
  public app: express.Application;

  constructor(config: Config) {
    this.app = express();

    if (config.environment != "test") {
      this.app.use(morgan("dev"));
    }

    this.app.use(cors());
    this.app.disable("x-powered-by");

    this.setupBodyParser();
    this.setupMongoSessionMiddleware();
    this.setupQueryStringJsonParser();
    this.setupDocumentation();
    this.setupRoutes();

    this.app.listen(config.server.port, (err) => {
      if (err) console.error(err);

      if (config.environment != "test") console.log("Express server running on port " + config.server.port + ".");
    });
  }

  /**
   * Sets up body parser so we can access req.body in controllers
   */
  private setupBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({limit: '50mb'}));
  }

  private setupDocumentation() {
    this.app.use(express.static('public'));
    this.app.set('views', path.resolve(__dirname + '/public'));
    this.app.set('view engine', 'html');
    this.app.engine('html', ejs.renderFile);
  }

  private setupMongoSessionMiddleware() {
    const MongoStore = connectMongo(session);
    const sessionMiddleware = session({
      secret: 'youll never guess this teehee',
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
   * Parses the query string's "query" value into JSON
   */
  private setupQueryStringJsonParser() {
    this.app.use(function(req, res, next) {
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

  private setupRoutes() {
    const router = express.Router();
    this.app.use('/v1', router);

    const authenticationController = new AuthenticationController(router);
    const documentationController = new DocumentationController(this.app);
    const usersController = new UsersController(router);
  }
};