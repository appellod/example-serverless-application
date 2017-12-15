import * as mongoose from "mongoose";

import { Config } from "@src/config";
import { UserModel, User } from "./models/user";

export class Mongoose {
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

    Mongoose.User = new User(config).model;
  }

  public static async clear() {
    await Mongoose.User.remove({});
  }
}
