import * as passport from "passport";
import { Strategy } from "passport-http-bearer";

import { Config } from "../../config";
import { Mongoose, UserDocument } from "../../mongoose";

export class BearerStrategy {
  constructor(config: Config) {
    passport.use(new Strategy(async (token, done) => {
      const user = await BearerStrategy.authenticate(token);
      return done(null, user);
    }));
  }

  public static async authenticate(token: string): Promise<UserDocument> {
    // Dind user with matching access token.
    let user = await Mongoose.User.findOne({ "tokens._id" : token }, { "tokens.$": 1 });

    // Make sure token is not expired.
    if (!user || user.tokens[0].expiresAt < new Date()) {
        return null;
    }

    // If token is not expired, authenticate user.
    user = await Mongoose.User.findOne({ _id: user._id });
    await user.refreshToken(token);

    return user;
  }
}
