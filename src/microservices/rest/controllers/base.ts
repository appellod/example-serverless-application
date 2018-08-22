import { Model as BaseModel } from "objection";

import { BasePermissions, User } from "../../../common/postgres";

export class BaseController<TModel extends BaseModel,
                            TPermissions extends BasePermissions<TModel>> {
  public Model: any;
  public permissions: TPermissions;

  constructor(Model: any, permissions: TPermissions) {
    this.Model = Model;
    this.permissions = permissions;
  }

  public async count(query: any, user: User) {
    const where = await this.permissions.where(query.where, user);

    const results = await this.Model.query().where(where).count();
    const count = parseInt(results[0].count, 10);

    return { count };
  }

  public async create(body: any, override: any, user: User) {
    const record = await this.permissions.create(body, override, user);
    return { record };
  }

  public async find(query: any, user: User) {
    const where = await this.permissions.where(query.where, user);

    const records = await this.Model
      .query()
      .where(where)
      .orderBy(query.sort)
      .limit(query.limit)
      .offset(query.skip)
      .select(query.select);

    Promise.all(records.map(async (record) => {
      return await this.permissions.read(record, user);
    }));

    return { records };
  }

  public async findOne(params: any, user: User) {
    const where = await this.permissions.where({ id: params.id }, user);
    let record = await this.Model.query().where(where).first();

    if (!record) {
      throw new Error("Record not found.");
    }

    record = await this.permissions.read(record, user);

    return { record };
  }

  public async remove(params: any, user: User) {
    const record = await this.Model.query().where({ id: params.id }).first();

    if (!record) {
      throw new Error("Record not found.");
    }

    await this.permissions.remove(record, user);

    return { record };
  }

  public async update(params: any, body: any, override: any, user: User) {
    let record = await this.Model.query().where({ id: params.id }).first();

    if (!record) {
      throw new Error("Record not found");
    }

    record = await this.permissions.update(record, body, override, user);

    return { record };
  }
}
