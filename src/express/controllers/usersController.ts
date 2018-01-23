import * as express from "express";

import { Mongoose, UserDocument, UserModel, UserPermissions } from "../../mongoose";
import { RestController } from "./";

export class UsersController extends RestController {
  protected Model: UserModel;
  protected permissions: UserPermissions;

  constructor() {
    super();

    this.Model = Mongoose.User;
    this.permissions = new UserPermissions();
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ user: UserDocument }> {
    const results = await super.create(req, res);
    const user = <UserDocument> results.record;

    return { user };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ users: UserDocument[] }> {
    const results = await super.find(req, res);
    const users = <UserDocument[]> results.records;

    return { users };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ user: UserDocument }> {
    const results = await super.findOne(req, res);
    const user = <UserDocument> results.record;

    return { user };
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ user: UserDocument }> {
    const results = await super.update(req, res);
    const user = <UserDocument> results.record;

    return { user };
  }
}
