import * as koa from "koa";
import * as passport from "koa-passport";

import { BearerStrategy } from "./";

export class Passport {
  constructor(app: koa) {
    app.use(passport.initialize());

    const bearerStrategy = new BearerStrategy();
    passport.use(bearerStrategy);
  }
}
