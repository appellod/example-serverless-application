import * as express from "express";

import { User, UserDocument, UserModel, UserPermissions } from "../../mongoose";
import { RestController } from "./";

export class UsersController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(User, new UserPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ user: UserDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const user = <UserDocument> results.record;

    return { user };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ users: UserDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const users = <UserDocument[]> results.records;

    return { users };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ user: UserDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const user = <UserDocument> results.record;

    return { user };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ user: UserDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const user = <UserDocument> results.record;

    return { user };
  }
}
