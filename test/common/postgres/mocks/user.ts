import * as Chance from "chance";

import { User } from "../../../../src/common/postgres";

export class UserMock extends User {
  public static async insert(params?: Partial<User>) {
    const chance = new Chance();

    params = params || {};
    params = Object.assign({}, params, {
      email: params.email || chance.email(),
      level: params.level || 0,
      password: params.password || chance.hash()
    });

    return User.query().insertAndFetch(params);
  }
}
