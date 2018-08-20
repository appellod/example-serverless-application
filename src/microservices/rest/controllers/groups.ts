import { Context } from "koa";

import { Group, GroupDocument, GroupModel, GroupPermissions } from "../../../common/mongo";
import { BaseController } from "./";

export class GroupsController {
  private restController: BaseController<GroupDocument, GroupModel, GroupPermissions>;

  constructor() {
    this.restController = new BaseController(Group, new GroupPermissions());
  }

  public async addUserIds(ctx: Context) {
    const userIds = [].concat(ctx.params.userIds.split(","));

    ctx.body = await this.restController.addAssociations(ctx.params.id, "userIds", userIds, ctx.state.user);
  }

  public async count(ctx: Context) {
    ctx.body = await this.restController.count(ctx.query, ctx.state.user);
  }

  public async create(ctx: Context) {
    const override = { ownerId: ctx.state.user._id };

    ctx.body = await this.restController.create(ctx.request.body, override, ctx.state.user);
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

  public async removeAllUserIds(ctx: Context) {
    ctx.body = await this.restController.removeAllAssociations(ctx.params.id, "userIds", ctx.state.user);
  }

  public async removeUserIds(ctx: Context) {
    const userIds = [].concat(ctx.params.userIds.split(","));

    ctx.body = await this.restController.removeAssociations(ctx.params.id, "userIds", userIds, ctx.state.user);
  }

  public async update(ctx: Context) {
    ctx.body = await this.restController.update(ctx.params, ctx.request.body, {}, ctx.state.user);
  }
}
