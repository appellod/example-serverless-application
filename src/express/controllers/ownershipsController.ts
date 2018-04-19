import * as express from "express";

import { Mongoose, OwnershipDocument, OwnershipPermissions } from "../../mongoose";
import { RestController } from "./";

export class OwnershipsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Ownership, new OwnershipPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ ownership: OwnershipDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const ownership = <OwnershipDocument> results.record;

    return { ownership };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ ownerships: OwnershipDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const ownerships = <OwnershipDocument[]> results.records;

    return { ownerships };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ ownership: OwnershipDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const ownership = <OwnershipDocument> results.record;

    return { ownership };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ ownership: OwnershipDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const ownership = <OwnershipDocument> results.record;

    return { ownership };
  }
}
