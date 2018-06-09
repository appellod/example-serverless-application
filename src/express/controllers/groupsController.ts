import * as express from "express";

import { Group, GroupDocument, GroupModel, GroupPermissions } from "../../mongoose";
import { RestController } from "./";

export class GroupsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Group, new GroupPermissions());
  }

  public async addUserIds(req: express.Request, res?: express.Response): Promise<{ group: GroupDocument }> {
    const userIds = [].concat(req.params.userIds.split(","));

    const results = await this.restController.addAssociations(req.params.id, "userIds", userIds, req.user);
    const group = <GroupDocument> results.record;

    return { group };
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ group: GroupDocument }> {
    const override = { ownerId: req.user._id };

    const results = await this.restController.create(req.body, override, req.user);
    const group = <GroupDocument> results.record;

    return { group };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ groups: GroupDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const groups = <GroupDocument[]> results.records;

    return { groups };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ group: GroupDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const group = <GroupDocument> results.record;

    return { group };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async removeAllUserIds(req: express.Request, res?: express.Response): Promise<{ group: GroupDocument }> {
    const results = await this.restController.removeAllAssociations(req.params.id, "userIds", req.user);
    const group = <GroupDocument> results.record;

    return { group };
  }

  public async removeUserIds(req: express.Request, res?: express.Response): Promise<{ group: GroupDocument }> {
    const userIds = [].concat(req.params.userIds.split(","));

    const results = await this.restController.removeAssociations(req.params.id, "userIds", userIds, req.user);
    const group = <GroupDocument> results.record;

    return { group };
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ group: GroupDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const group = <GroupDocument> results.record;

    return { group };
  }
}
