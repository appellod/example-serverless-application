import * as express from "express";

import { Mongoose, ContractDocument, ContractPermissions } from "../../mongoose";
import { RestController } from "./";

export class ContractsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Contract, new ContractPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ contract: ContractDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const contract = <ContractDocument> results.record;

    return { contract };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ contracts: ContractDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const contracts = <ContractDocument[]> results.records;

    return { contracts };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ contract: ContractDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const contract = <ContractDocument> results.record;

    return { contract };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ contract: ContractDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const contract = <ContractDocument> results.record;

    return { contract };
  }
}
