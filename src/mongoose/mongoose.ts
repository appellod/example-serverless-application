import * as mongoose from "mongoose";

import { Config } from "../config";
import { FileModel, File, TokenModel, Token, UserModel, User } from "./";

export class Mongoose {
  public static File: FileModel;
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

    Mongoose.File = new File(config).model;
    Mongoose.Token = new Token(config).model;
    Mongoose.User = new User(config).model;
  }

  public static async clear() {
    await Mongoose.File.remove({});
    await Mongoose.Token.remove({});
    await Mongoose.User.remove({});
  }
}
