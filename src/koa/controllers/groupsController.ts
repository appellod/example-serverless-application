import { Context } from "koa";

import { Group, GroupDocument, GroupPermissions } from "../../mongoose";
import { RestController } from "./";

export class GroupsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Group, new GroupPermissions());
  }

  public async addUserIds(ctx: Context) {
    const userIds = [].concat(ctx.params.userIds.split(","));

    const results = await this.restController.addAssociations(ctx.params.id, "userIds", userIds, ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }

  public async count(ctx: Context) {
    ctx.body = await this.restController.count(ctx.query, ctx.state.user);
  }

  public async create(ctx: Context) {
    const override = { ownerId: ctx.state.user._id };

    const results = await this.restController.create(ctx.request.body, override, ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }

  public async find(ctx: Context) {
    const results = await this.restController.find(ctx.query, ctx.state.user);
    const groups = <GroupDocument[]> results.records;

    ctx.body = { groups };
  }

  public async findOne(ctx: Context) {
    const results = await this.restController.findOne(ctx.params, ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }

  public async remove(ctx: Context) {
    const results = await this.restController.remove(ctx.params, ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }

  public async removeAllUserIds(ctx: Context) {
    const results = await this.restController.removeAllAssociations(ctx.params.id, "userIds", ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }

  public async removeUserIds(ctx: Context) {
    const userIds = [].concat(ctx.params.userIds.split(","));

    const results = await this.restController.removeAssociations(ctx.params.id, "userIds", userIds, ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }

  public async update(ctx: Context) {
    const results = await this.restController.update(ctx.params, ctx.request.body, {}, ctx.state.user);
    const group = <GroupDocument> results.record;

    ctx.body = { group };
  }
}
