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

  public async findFriends(ctx: Context) {
    const records = await this.restController.relatedQuery(ctx.params.id, "friends", ctx.query, ctx.state.user);
    ctx.body = { records };
  }

  public async findIgnoredUsers(ctx: Context) {
    const records = await this.restController.relatedQuery(ctx.params.id, "ignored_users", ctx.query, ctx.state.user);
    ctx.body = { records };
  }

  public async findOne(ctx: Context) {
    const record = await this.restController.findOne(ctx.params.id, ctx.state.user);
    ctx.body = { record };
  }

  public async relateFriends(ctx: Context) {
    const record = await this.restController.relate(ctx.params.id, "friends", ctx.request.body.childIds, ctx.state.user);
    ctx.body = { record };
  }

  public async relateIgnoredUsers(ctx: Context) {
    const record = await this.restController.relate(ctx.params.id, "ignored_users", ctx.request.body.childIds, ctx.state.user);
    ctx.body = { record };
  }

  public async remove(ctx: Context) {
    const record = await this.restController.remove(ctx.params.id, ctx.state.user);
    ctx.body = { record };
  }

  public async unrelateFriends(ctx: Context) {
    const record = await this.restController.unrelate(ctx.params.id, "friends", ctx.request.body.childIds, ctx.state.user);
    ctx.body = { record };
  }

  public async unrelateIgnoredUsers(ctx: Context) {
    const record = await this.restController.unrelate(ctx.params.id, "ignored_users", ctx.request.body.childIds, ctx.state.user);
    ctx.body = { record };
  }

  public async update(ctx: Context) {
    const record = await this.restController.update(ctx.params.id, ctx.request.body, {}, ctx.state.user);
    ctx.body = { record };
  }
}
