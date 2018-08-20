import { Strategy } from "passport-http-bearer";

import { Token, User, UserDocument } from "../../mongo";

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

  public static async authenticate(tokenId: string): Promise<UserDocument> {
    const token = await Token.findOne({ _id: tokenId });

    // Make sure token is not expired.
    if (!token || token.isExpired()) {
        return null;
    }

    token.refresh();
    return User.findOne({ _id: token.userId });
  }
}
