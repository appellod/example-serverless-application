import * as mongoose from "mongoose";

import { Config } from "../config/config";
import { IUserModel, User } from "../models/user";

export class Mongoose {
  public static User: IUserModel;

  constructor(config: Config) {
    const host = config.mongo.host;
    const port = config.mongo.port;
    const database = config.mongo.database;
    const url = `mongodb://${host}:${port}/${database}`;

    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(url, err => {
      if (err) throw err;

      if (config.environment != "test") console.log("Mongoose connection successful.");
    });

    Mongoose.User = new User(config).model;
  }

  public static async clear() {
    await Mongoose.User.remove({});
  }
};