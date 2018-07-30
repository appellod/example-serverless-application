import * as koa from "koa";
import * as path from "path";
import * as Router from "koa-router";
import * as send from "koa-send";

import { User } from "../mongoose";

export class Documentation {
  private app: koa;

  constructor(app: koa) {
    this.app = app;

    this.setupRoutes();
  }

  private setupRoutes() {
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
        await send(ctx, path.resolve(__dirname, "public", file), { root: "/" });
      } else {
        ctx.redirect("/login.html");
      }
    });

    /**
     * Loads login resources without requiring the user to be logged in.
     */
    router.get(/(\/login.html|\/css\/login.css|\/js\/login.js)/, async (ctx: koa.Context) => {
      const file = ctx.originalUrl.split("?")[0].replace("/", "");
      await send(ctx, path.resolve(__dirname, "public", file), { root: "/" });
    });

    /**
     * Logs the user in if the username and password are correct and redirects
     * them to documentation page.
     */
    router.post("/login", async (ctx: koa.Context) => {
      const user = await User.findOne({ email: ctx.request.body.email });

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
