import * as mongoose from "mongoose";

import { Config } from "../config";
import {
  BuyersNeed,
  BuyersNeedModel,
  Company,
  CompanyModel,
  Contact,
  ContactModel,
  ContactGroup,
  ContactGroupModel,
  Group,
  GroupModel,
  Ownership,
  OwnershipModel,
  Property,
  PropertyModel,
  Task,
  TaskModel,
  Token,
  TokenModel,
  User,
  UserModel
} from "./";

export class Mongoose {
  public static BuyersNeed: BuyersNeedModel;
  public static Company: CompanyModel;
  public static Contact: ContactModel;
  public static ContactGroup: ContactGroupModel;
  public static Group: GroupModel;
  public static Ownership: OwnershipModel;
  public static Property: PropertyModel;
  public static Task: TaskModel;
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

    Mongoose.BuyersNeed = new BuyersNeed(config).model;
    Mongoose.Company = new Company(config).model;
    Mongoose.Contact = new Contact(config).model;
    Mongoose.ContactGroup = new ContactGroup(config).model;
    Mongoose.Group = new Group(config).model;
    Mongoose.Ownership = new Ownership(config).model;
    Mongoose.Property = new Property(config).model;
    Mongoose.Task = new Task(config).model;
    Mongoose.Token = new Token(config).model;
    Mongoose.User = new User(config).model;
  }

  public static async clear() {
    await Promise.all([
      Mongoose.BuyersNeed.remove({}),
      Mongoose.Company.remove({}),
      Mongoose.Contact.remove({}),
      Mongoose.ContactGroup.remove({}),
      Mongoose.Group.remove({}),
      Mongoose.Ownership.remove({}),
      Mongoose.Property.remove({}),
      Mongoose.Task.remove({}),
      Mongoose.Token.remove({}),
      Mongoose.User.remove({})
    ]);
  }
}
