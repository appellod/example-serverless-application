import * as koa from "koa";
import * as passport from "koa-passport";

import { BearerStrategy } from "./";

export function setup(app: koa) {
  app.use(passport.initialize());

  const bearerStrategy = new BearerStrategy();
  passport.use(bearerStrategy);
}
