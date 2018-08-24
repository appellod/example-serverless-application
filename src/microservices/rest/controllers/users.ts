import { Context } from "koa";

import { User, UserPermissions } from "../../../common/postgres";
import { BaseController } from "./";

export class UsersController {
  private restController: BaseController<User, UserPermissions>;

  constructor() {
    this.restController = new BaseController(User, new UserPermissions());
  }

  public async count(ctx: Context) {
    const count = await this.restController.count(ctx.query, ctx.state.user);
    ctx.body = { count };
  }

  public async create(ctx: Context) {
    const record = await this.restController.create(ctx.request.body, {}, ctx.state.user);
    ctx.body = { record };
  }

  public async find(ctx: Context) {
    const records = await this.restController.find(ctx.query, ctx.state.user);
    ctx.body = { records };
  }

  public async findOne(ctx: Context) {
    const record = await this.restController.findOne(ctx.params, ctx.state.user);
    ctx.body = { record };
  }

  public async remove(ctx: Context) {
    const record = await this.restController.remove(ctx.params, ctx.state.user);
    ctx.body = { record };
  }

  public async update(ctx: Context) {
    const record = await this.restController.update(ctx.params, ctx.request.body, {}, ctx.state.user);
    ctx.body = { record };
  }
}
