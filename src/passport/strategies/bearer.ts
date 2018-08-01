import { Strategy } from "passport-http-bearer";

import { User, UserDocument } from "../../mongoose";
import { Token } from "../../redis";

export class BearerStrategy extends Strategy {
  constructor() {
    super(async (token, done) => {
      let user: UserDocument;

      try {
        user = await BearerStrategy.authenticate(token);
      } catch (e) {}

      return done(null, user);
    });
  }

  public static async authenticate(token: string): Promise<UserDocument> {
    const user = await Token.validate(token);

    // Reject if token was invalid.
    if (!user) {
      return null;
    }

    Token.refresh(token);
    return user;
  }
}
