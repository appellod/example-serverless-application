import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import * as http from "http";
import * as koa from "koa";
import * as MongooseStore from "koa-session-mongoose";
import * as morgan from "koa-morgan";
import * as Router from "koa-router";
import * as send from "koa-send";
import * as session from "koa-session2";
import * as path from "path";

import { User } from "../postgres";
import { errorMiddleware, parseQueryJsonMiddleware, RedisStore } from "./";

export class Koa {
  public app: koa;
  public server: http.Server;

  constructor(port: number | string) {
    this.app = new koa();

    if (process.env.NODE_ENV !== "test") {
      this.app.use(morgan("dev"));
    }

    // Allow CORS requests.
    this.app.use(cors());

    // Sets up body parser so we can access req.body in controllers.
    this.app.use(bodyParser({ jsonLimit: "50mb" }));

    // Setup our Redis session store for API documentation logins.
    this.app.use(session({ store: new RedisStore() }));

    // Setup our middleware.
    this.app.use(errorMiddleware);
    this.app.use(parseQueryJsonMiddleware);

    this.server = this.app.listen(port);
  }

  /**
   * Enables API documentation for this KOA instance.
   */
  public enableDocumentation(directory: string) {
    const router = new Router();

    /**
     * Sends user to API documentation if they are logged in or to login if they are not.
     */
    router.get("/", (ctx: koa.Context) => {
      if (ctx.session.isLoggedIn) {
        ctx.redirect("/apidoc/index.html");
      } else {
        ctx.redirect("/login.html");
      }
    });

    /**
     * Loads static API documentation file if they are logged in.
     */
    router.get("/apidoc*", async (ctx: koa.Context) => {
      if (ctx.session.isLoggedIn) {
        const file = ctx.originalUrl.split("?")[0].replace("/", "");
        await send(ctx, path.resolve(directory, file), { root: "/" });
      } else {
        ctx.redirect("/login.html");
      }
    });

    /**
     * Loads login resources without requiring the user to be logged in.
     */
    router.get(/(\/login.html|\/css\/login.css|\/js\/login.js)/, async (ctx: koa.Context) => {
      const file = ctx.originalUrl.split("?")[0].replace("/", "");
      await send(ctx, path.resolve(__dirname, "documentation", file), { root: "/" });
    });

    /**
     * Logs the user in if the username and password are correct and redirects
     * them to documentation page.
     */
    router.post("/login", async (ctx: koa.Context) => {
      const user = await User.query().where({ email: ctx.request.body.email }).first();

      if (user && user.isValidPassword(ctx.request.body.password)) {
        ctx.session.isLoggedIn = true;
        ctx.status = 200;
      } else {
        ctx.session.isLoggedIn = false;
        throw new Error("Incorrect email address or password.");
      }
    });

    this.app.use(router.routes());
  }
}
