import { Model as BaseModel, QueryBuilder } from "objection";

import { BasePermissions, User } from "../../../common/postgres";

export class BaseController<TModel extends BaseModel,
                            TPermissions extends BasePermissions<TModel>> {
  public Model: any;
  public permissions: TPermissions;

  constructor(Model: any, permissions: TPermissions) {
    this.Model = Model;
    this.permissions = permissions;
  }

  /**
   * Finds the number of elements matching the criteria.
   */
  public async count(params: any, user: User) {
    let query: QueryBuilder<TModel, TModel[], TModel[]> = this.Model.query();

    if (params.where) {
      query = query.where((builder) => this.where(builder, params.where));

      const where = await this.permissions.where(user);
      query = query.where((builder) => this.where(builder, where));
    }

    const results: any[] = await query.count();
    return parseInt(results[0].count, 10);
  }

  /**
   * Creates a new record.
   */
  public async create(body: any, override: any, user: User) {
    return this.permissions.create(body, override, user);
  }

  /**
   * Returns all the records matching the criteria.
   */
  public async find(params: any, user: User) {
    let query: QueryBuilder<TModel, TModel[], TModel[]> = this.Model.query();

    if (params.limit) {
      query = query.limit(params.limit);
    }

    if (params.select) {
      query = query.select(params.select);
    }

    if (params.skip) {
      query = query.offset(params.skip);
    }

    if (params.sort) {
      query = this.sort(query, params.sort);
    }

    if (params.where) {
      query = query.where((builder) => this.where(builder, params.where));

      const where = await this.permissions.where(user);
      query = query.where((builder) => this.where(builder, where));
    }

    const records = await query;

    return Promise.all(records.map((record) => this.permissions.read(record, user)));
  }

  /**
   * Finds the record by ID.
   */
  public async findOne(params: any, user: User) {
    let query: QueryBuilder<TModel, TModel[], TModel[]> = this.Model.query();

    query = query.where((builder) => this.where(builder, { id: params.id }));

    const where = await this.permissions.where(user);
    query = query.where((builder) => this.where(builder, where));

    const record = await query.first();

    if (!record) {
      throw new Error("Record not found.");
    }

    return this.permissions.read(record, user);
  }

  /**
   * Removes a record.
   */
  public async remove(params: any, user: User) {
    const record = await this.Model.query().where({ id: params.id }).first();

    if (!record) {
      throw new Error("Record not found.");
    }

    return this.permissions.remove(record, user);
  }

  /**
   * Applies ORDER BY for each array element. Negative elements are marked as DESC.
   */
  public sort(query: QueryBuilder<TModel, TModel[], TModel[]>, sort: string[]) {
    sort.forEach((field) => {
      if (field.charAt(0) === "-") {
        field = field.substring(1);
        query = query.orderBy(field, "desc");
      } else {
        query = query.orderBy(field);
      }
    });

    return query;
  }

  /**
   * Updates a record.
   */
  public async update(params: any, body: any, override: any, user: User) {
    const record = await this.Model.query().where({ id: params.id }).first();

    if (!record) {
      throw new Error("Record not found");
    }

    return this.permissions.update(record, body, override, user);
  }

  /**
   * Parses Mongo-like syntax and converts it into SQL.
   */
  public where(query: QueryBuilder<TModel, TModel[], TModel[]>, params: any, isAnd = true) {
    Object.keys(params).forEach((key) => {
      let value = params[key];

      if (typeof value !== "object") {
        query = query.where(key, value);
      } else if (key === "$and") {
        value.forEach((v) => query = this.where(query, v));
      } else if (key === "$or") {
        value.forEach((v) => query = this.where(query, v, false));
      } else {
        const operator = Object.keys(value)[0];
        value = value[operator];

        switch (operator) {
          case "$eq":
            query = isAnd ? query.where(key, value) : query.orWhere(key, value);
            break;
          case "$gt":
            query = isAnd ? query.where(key, ">", value) : query.orWhere(key, ">", value);
            break;
          case "$gte":
            query = isAnd ? query.where(key, ">=", value) : query.orWhere(key, ">=", value);
            break;
          case "$in":
            query = isAnd ? query.whereIn(key, value) : query.orWhereIn(key, value);
            break;
          case "$lt":
            query = isAnd ? query.where(key, "<", value) : query.orWhere(key, "<", value);
            break;
          case "$lte":
            query = isAnd ? query.where(key, "<=", value) : query.orWhere(key, "<=", value);
            break;
          case "$ne":
            query = isAnd ? query.whereNot(key, value) : query.orWhereNot(key, value);
            break;
          case "$nin":
            query = isAnd ? query.whereNotIn(key, value) : query.orWhereNotIn(key, value);
            break;
          default:
            throw new Error(`Operator not supported: ${key}.`);
        }
      }
    });

    return query;
  }
}
