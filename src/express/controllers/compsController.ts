import * as express from "express";

import { Mongoose, CompDocument, CompPermissions } from "../../mongoose";
import { RestController } from "./";

export class CompsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Comp, new CompPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ comp: CompDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const comp = <CompDocument> results.record;

    return { comp };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ comps: CompDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const comps = <CompDocument[]> results.records;

    return { comps };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ comp: CompDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const comp = <CompDocument> results.record;

    return { comp };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ comp: CompDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const comp = <CompDocument> results.record;

    return { comp };
  }
}
