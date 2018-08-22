import * as jwt from "jsonwebtoken";
import { Strategy } from "passport-http-bearer";

import { User } from "../../postgres";

export class BearerStrategy extends Strategy {
  constructor() {
    super(async (token, done) => {
      try {
        const user = await BearerStrategy.authenticate(token);
        return done(null, user);
      } catch (e) {
        return done(null);
      }
    });
  }

  public static async authenticate(token: string): Promise<User> {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    return User.query().where({ id: decoded.user.id }).first();
  }
}
