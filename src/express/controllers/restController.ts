import * as express from "express";
import * as mongoose from "mongoose";

import { Mongoose, Permissions } from "../../mongoose";

export abstract class RestController {
  protected Model: mongoose.Model<mongoose.Document>;
  protected permissions: Permissions;

  public async create(req: express.Request, res?: express.Response): Promise<any> {
    const record = await this.permissions.create(req.body, req.user);
    return { record };
  }

  public async find(req: express.Request, res?: express.Response): Promise<any> {
    const where = await this.permissions.where(req.query.where, req.user);

    const records = await this.Model
      .find(where)
      .sort(req.query.sort)
      .skip(req.query.skip)
      .limit(req.query.limit)
      .select(req.query.select)
      .exec();

    Promise.all(records.map(async (record) => {
      return await this.permissions.read(record, req.user);
    }));

    return { records };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<any> {
    const where = await this.permissions.where({ _id: req.params.id }, req.user);
    let record = await this.Model.findOne(where);

    if (!record) {
      throw new Error("Record not found.");
    }

    record = await this.permissions.read(record, req.user);

    return { record };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    const record = await this.Model.findOne({ _id: req.params.id });

    if (!record) {
      throw new Error("Record not found.");
    }

    await this.permissions.remove(record, req.user);

    return { message: "Record removed successfully." };
  }

  public async update(req: express.Request, res?: express.Response): Promise<any> {
    let record = await this.Model.findOne({ _id: req.params.id });

    if (!record) {
      throw new Error("Record not found");
    }

    record = await this.permissions.update(record, req.body, req.user);

    return { record };
  }
}
