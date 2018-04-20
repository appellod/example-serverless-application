import * as mongoose from "mongoose";

import { Config } from "../config";
import {
  BuyersNeed,
  BuyersNeedModel,
  Comp,
  CompModel,
  Company,
  CompanyModel,
  Contact,
  ContactModel,
  ContactGroup,
  ContactGroupModel,
  Contract,
  ContractModel,
  DealParty,
  DealPartyModel,
  Group,
  GroupModel,
  Listing,
  ListingModel,
  Offer,
  OfferModel,
  Ownership,
  OwnershipModel,
  Property,
  PropertyModel,
  Pursuit,
  PursuitModel,
  Task,
  TaskModel,
  Token,
  TokenModel,
  User,
  UserModel
} from "./";

export class Mongoose {
  public static BuyersNeed: BuyersNeedModel;
  public static Comp: CompModel;
  public static Company: CompanyModel;
  public static Contact: ContactModel;
  public static ContactGroup: ContactGroupModel;
  public static Contract: ContractModel;
  public static DealParty: DealPartyModel;
  public static Group: GroupModel;
  public static Listing: ListingModel;
  public static Offer: OfferModel;
  public static Ownership: OwnershipModel;
  public static Property: PropertyModel;
  public static Pursuit: PursuitModel;
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
    Mongoose.Comp = new Comp(config).model;
    Mongoose.Company = new Company(config).model;
    Mongoose.Contact = new Contact(config).model;
    Mongoose.ContactGroup = new ContactGroup(config).model;
    Mongoose.Contract = new Contract(config).model;
    Mongoose.DealParty = new DealParty(config).model;
    Mongoose.Group = new Group(config).model;
    Mongoose.Listing = new Listing(config).model;
    Mongoose.Offer = new Offer(config).model;
    Mongoose.Ownership = new Ownership(config).model;
    Mongoose.Property = new Property(config).model;
    Mongoose.Pursuit = new Pursuit(config).model;
    Mongoose.Task = new Task(config).model;
    Mongoose.Token = new Token(config).model;
    Mongoose.User = new User(config).model;
  }

  public static async clear() {
    await Promise.all([
      Mongoose.BuyersNeed.remove({}),
      Mongoose.Comp.remove({}),
      Mongoose.Company.remove({}),
      Mongoose.Contact.remove({}),
      Mongoose.ContactGroup.remove({}),
      Mongoose.Contract.remove({}),
      Mongoose.DealParty.remove({}),
      Mongoose.Group.remove({}),
      Mongoose.Listing.remove({}),
      Mongoose.Offer.remove({}),
      Mongoose.Ownership.remove({}),
      Mongoose.Property.remove({}),
      Mongoose.Pursuit.remove({}),
      Mongoose.Task.remove({}),
      Mongoose.Token.remove({}),
      Mongoose.User.remove({})
    ]);
  }
}
