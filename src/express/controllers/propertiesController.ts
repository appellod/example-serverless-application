import * as express from "express";

import { Mongoose, PropertyDocument, PropertyPermissions } from "../../mongoose";
import { RestController } from "./";

export class PropertiesController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Property, new PropertyPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ property: PropertyDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const property = <PropertyDocument> results.record;

    return { property };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ properties: PropertyDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const properties = <PropertyDocument[]> results.records;

    return { properties };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ property: PropertyDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const property = <PropertyDocument> results.record;

    return { property };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ property: PropertyDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const property = <PropertyDocument> results.record;

    return { property };
  }
}
