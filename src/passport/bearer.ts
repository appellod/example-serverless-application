import * as passport from "passport";
import { Strategy } from "passport-http-bearer";

import { Config } from "../config";
import { Mongoose } from "../mongoose";

export class BearerStrategy {
  constructor(config: Config) {
    passport.use(new Strategy(async (token, done) => {
      // find user with matching access token
      let user = await Mongoose.User.findOne({ "tokens._id" : token }, { "tokens.$": 1 });

      if (!user || user.tokens[0].expiresAt < new Date()) {
          return done(null, false);
      }

      // if token is not expired, authenticate user
      user = await Mongoose.User.findOne({ _id: user._id });

      await user.refreshToken(token);

      return done(null, user);
    }));
  }
}
