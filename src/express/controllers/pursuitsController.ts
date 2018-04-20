import * as express from "express";

import { Mongoose, PursuitDocument, PursuitPermissions } from "../../mongoose";
import { RestController } from "./";

export class PursuitsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Pursuit, new PursuitPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ pursuit: PursuitDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const pursuit = <PursuitDocument> results.record;

    return { pursuit };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ pursuits: PursuitDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const pursuits = <PursuitDocument[]> results.records;

    return { pursuits };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ pursuit: PursuitDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const pursuit = <PursuitDocument> results.record;

    return { pursuit };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ pursuit: PursuitDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const pursuit = <PursuitDocument> results.record;

    return { pursuit };
  }
}
