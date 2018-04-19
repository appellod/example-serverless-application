import * as express from "express";

import { Mongoose, BuyersNeedDocument, BuyersNeedPermissions } from "../../mongoose";
import { RestController } from "./";

export class BuyersNeedsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.BuyersNeed, new BuyersNeedPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ buyersNeed: BuyersNeedDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const buyersNeed = <BuyersNeedDocument> results.record;

    return { buyersNeed };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ buyersNeeds: BuyersNeedDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const buyersNeeds = <BuyersNeedDocument[]> results.records;

    return { buyersNeeds };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ buyersNeed: BuyersNeedDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const buyersNeed = <BuyersNeedDocument> results.record;

    return { buyersNeed };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ buyersNeed: BuyersNeedDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const buyersNeed = <BuyersNeedDocument> results.record;

    return { buyersNeed };
  }
}
