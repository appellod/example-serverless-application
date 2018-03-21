import * as passport from "passport";
import { Strategy } from "passport-http-bearer";

import { Config } from "../../config";
import { Mongoose, UserDocument, TokenDocument } from "../../mongoose";

export class BearerStrategy {
  constructor(config: Config) {
    passport.use(new Strategy(async (token, done) => {
      let user: UserDocument;

      try {
        user = await BearerStrategy.authenticate(token);
      } catch (e) {}

      return done(null, user);
    }));
  }

  public static async authenticate(tokenId: string): Promise<UserDocument> {
    const token = await Mongoose.Token.findOne({ _id: tokenId });

    // Make sure token is not expired.
    if (!token || token.isExpired()) {
        return null;
    }

    token.refresh();
    return Mongoose.User.findOne({ _id: token.userId });
  }
}
