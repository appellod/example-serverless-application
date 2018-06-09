import { Application } from "express";
import * as passport from "passport";

import { BearerStrategy } from "./";

export class Passport {
  constructor(express: Application) {
    express.use(passport.initialize());

    const bearerStrategy = new BearerStrategy();
  }
}
