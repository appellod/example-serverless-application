import * as express from "express";

import { Mongoose, DealPartyDocument, DealPartyPermissions } from "../../mongoose";
import { RestController } from "./";

export class DealPartiesController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.DealParty, new DealPartyPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ dealParty: DealPartyDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const dealParty = <DealPartyDocument> results.record;

    return { dealParty };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ dealParties: DealPartyDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const dealParties = <DealPartyDocument[]> results.records;

    return { dealParties };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ dealParty: DealPartyDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const dealParty = <DealPartyDocument> results.record;

    return { dealParty };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ dealParty: DealPartyDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const dealParty = <DealPartyDocument> results.record;

    return { dealParty };
  }
}
