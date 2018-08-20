import { Context } from "koa";

import { User, UserDocument, UserModel, UserPermissions } from "../../../common/mongo";
import { BaseController } from "./";

export class UsersController {
  private restController: BaseController<UserDocument, UserModel, UserPermissions>;

  constructor() {
    this.restController = new BaseController(User, new UserPermissions());
  }

  public async count(ctx: Context) {
    ctx.body = await this.restController.count(ctx.query, ctx.state.user);
  }

  public async create(ctx: Context) {
    ctx.body = await this.restController.create(ctx.request.body, {}, ctx.state.user);
  }

  public async find(ctx: Context) {
    ctx.body = await this.restController.find(ctx.query, ctx.state.user);
  }

  public async findOne(ctx: Context) {
    ctx.body = await this.restController.findOne(ctx.params, ctx.state.user);
  }

  public async remove(ctx: Context) {
    ctx.body = await this.restController.remove(ctx.params, ctx.state.user);
  }

  public async update(ctx: Context) {
    ctx.body = await this.restController.update(ctx.params, ctx.request.body, {}, ctx.state.user);
  }
}
