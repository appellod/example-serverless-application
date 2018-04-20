import * as express from "express";

import { Mongoose, OfferDocument, OfferPermissions } from "../../mongoose";
import { RestController } from "./";

export class OffersController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Offer, new OfferPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ offer: OfferDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const offer = <OfferDocument> results.record;

    return { offer };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ offers: OfferDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const offers = <OfferDocument[]> results.records;

    return { offers };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ offer: OfferDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const offer = <OfferDocument> results.record;

    return { offer };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ offer: OfferDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const offer = <OfferDocument> results.record;

    return { offer };
  }
}
