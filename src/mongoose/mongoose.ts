import * as mongoose from "mongoose";

import { Config } from "../config";
import { GroupModel, Group, TokenModel, Token, UserModel, User } from "./";

export class Mongoose {
  public static Group: GroupModel;
  public static Token: TokenModel;
  public static User: UserModel;

  constructor(config: Config) {
    (mongoose as any).Promise = global.Promise;

    const host = config.mongo.host;
    const port = config.mongo.port;
    const database = config.mongo.database;
    const url = `mongodb://${host}:${port}/${database}`;

    mongoose.connect(url, (err) => {
      if (err) throw err;

      if (config.environment !== "test") console.log("Mongoose connection successful.");
    });

    Mongoose.Group = new Group(config).model;
    Mongoose.Token = new Token(config).model;
    Mongoose.User = new User(config).model;
  }

  public static async clear() {
    await Mongoose.Group.remove({});
    await Mongoose.Token.remove({});
    await Mongoose.User.remove({});
  }
}
