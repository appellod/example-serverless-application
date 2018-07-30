import { Context } from "koa";

import { User, UserDocument, UserModel, UserPermissions } from "../../mongoose";
import { RestController } from "./";

export class UsersController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(User, new UserPermissions());
  }

  public async count(ctx: Context) {
    ctx.body = await this.restController.count(ctx.query, ctx.state.user);
  }

  public async create(ctx: Context) {
    const results = await this.restController.create(ctx.request.body, {}, ctx.state.user);
    const user = <UserDocument> results.record;

    ctx.body = { user };
  }

  public async find(ctx: Context) {
    const results = await this.restController.find(ctx.query, ctx.state.user);
    const users = <UserDocument[]> results.records;

    ctx.body = { users };
  }

  public async findOne(ctx: Context) {
    const results = await this.restController.findOne(ctx.params, ctx.state.user);
    const user = <UserDocument> results.record;

    ctx.body = { user };
  }

  public async remove(ctx: Context) {
    const results = await this.restController.remove(ctx.params, ctx.state.user);
    const user = <UserDocument> results.record;

    ctx.body = { user };
  }

  public async update(ctx: Context) {
    const results = await this.restController.update(ctx.params, ctx.request.body, {}, ctx.state.user);
    const user = <UserDocument> results.record;

    ctx.body = { user };
  }
}
