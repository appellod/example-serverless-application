import * as express from "express";

import { Mongoose, ListingDocument, ListingPermissions } from "../../mongoose";
import { RestController } from "./";

export class ListingsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Listing, new ListingPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ listing: ListingDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const listing = <ListingDocument> results.record;

    return { listing };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ listings: ListingDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const listings = <ListingDocument[]> results.records;

    return { listings };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ listing: ListingDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const listing = <ListingDocument> results.record;

    return { listing };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ listing: ListingDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const listing = <ListingDocument> results.record;

    return { listing };
  }
}
