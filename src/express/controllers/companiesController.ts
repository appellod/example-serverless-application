import * as express from "express";

import { Mongoose, CompanyDocument, CompanyPermissions } from "../../mongoose";
import { RestController } from "./";

export class CompaniesController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Company, new CompanyPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ company: CompanyDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const company = <CompanyDocument> results.record;

    return { company };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ companies: CompanyDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const companies = <CompanyDocument[]> results.records;

    return { companies };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ company: CompanyDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const company = <CompanyDocument> results.record;

    return { company };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ company: CompanyDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const company = <CompanyDocument> results.record;

    return { company };
  }
}
