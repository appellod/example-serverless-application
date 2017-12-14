import { Application } from "express";
import * as passport from "passport";

import { BearerStrategy } from "../passport-strategies/bearer";
import { Config } from "../config/config";

export class Passport {
  constructor(config: Config, express: Application) {
    express.use(passport.initialize());

    const bearerStrategy = new BearerStrategy(config);
  }
}
