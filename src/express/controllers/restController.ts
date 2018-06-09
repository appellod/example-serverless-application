import * as express from "express";
import * as mongoose from "mongoose";

import { Permissions, UserDocument } from "../../mongoose";

export class RestController {
  public Model: mongoose.Model<mongoose.Document>;
  public permissions: Permissions;

  constructor(Model: mongoose.Model<mongoose.Document>, permissions: Permissions) {
    this.Model = Model;
    this.permissions = permissions;
  }

  public async addAssociations(recordId: string | mongoose.Types.ObjectId, attribute: string, ids: string[] | mongoose.Types.ObjectId[], user: UserDocument): Promise<any> {
    let record = await this.Model.findOne({ _id: recordId });

    if (!record) {
      throw new Error("Record not found");
    }

    record = await this.permissions.addAssociations(record, attribute, ids, user);

    return { record };
  }

  public async count(query: any, user: UserDocument): Promise<{ count: number }> {
    const where = await this.permissions.where(query.where, user);

    const count = await this.Model
      .find(where)
      .count()
      .exec();

    return { count };
  }

  public async create(body: any, override: any, user: UserDocument): Promise<any> {
    const record = await this.permissions.create(body, override, user);
    return { record };
  }

  public async find(query: any, user: UserDocument): Promise<any> {
    const where = await this.permissions.where(query.where, user);

    const records = await this.Model
      .find(where)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .select(query.select)
      .exec();

    Promise.all(records.map(async (record) => {
      return await this.permissions.read(record, user);
    }));

    return { records };
  }

  public async findOne(params: any, user: UserDocument): Promise<any> {
    const where = await this.permissions.where({ _id: params.id }, user);
    let record = await this.Model.findOne(where);

    if (!record) {
      throw new Error("Record not found.");
    }

    record = await this.permissions.read(record, user);

    return { record };
  }

  public async remove(params: any, user: UserDocument): Promise<any> {
    const record = await this.Model.findOne({ _id: params.id });

    if (!record) {
      throw new Error("Record not found.");
    }

    await this.permissions.remove(record, user);

    return { message: "Record removed successfully." };
  }

  public async removeAllAssociations(recordId: string | mongoose.Types.ObjectId, attribute: string, user: UserDocument): Promise<any> {
    let record = await this.Model.findOne({ _id: recordId });

    if (!record) {
      throw new Error("Record not found");
    }

    record = await this.permissions.removeAllAssociations(record, attribute, user);

    return { record };
  }

  public async removeAssociations(recordId: string | mongoose.Types.ObjectId, attribute: string, ids: string[] | mongoose.Types.ObjectId[], user: UserDocument): Promise<any> {
    let record = await this.Model.findOne({ _id: recordId });

    if (!record) {
      throw new Error("Record not found");
    }

    record = await this.permissions.removeAssociations(record, attribute, ids, user);

    return { record };
  }

  public async update(params: any, body: any, override: any, user: UserDocument): Promise<any> {
    let record = await this.Model.findOne({ _id: params.id });

    if (!record) {
      throw new Error("Record not found");
    }

    record = await this.permissions.update(record, body, override, user);

    return { record };
  }

  public async push(id: string, field: string, otherId: string, user: UserDocument): Promise<any> {
    let record = await this.Model.findOne({ _id: id });

    if (!record) {
      throw new Error("Record not found");
    }

    const readPermissions = await this.permissions.readPermissions(record, user);
    if (readPermissions.indexOf(field) < 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    record = await this.Model.findOneAndUpdate({ _id: id }, { $addToSet: { [field]: otherId } }, { new: true });

    return { record };
  }
}
