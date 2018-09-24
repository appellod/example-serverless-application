import { BaseModel, BasePermissions, User } from "@example/postgres";
import { QueryBuilder } from "objection";

export class RestController<TModel extends BaseModel, TPermissions extends BasePermissions<TModel>> {
  public Model: any;
  public permissions: TPermissions;

  constructor(Model: any, permissions: TPermissions) {
    this.Model = Model;
    this.permissions = permissions;
  }

  public async count(params: any, user: User) {
    const query = this.query(this.permissions, this.Model.query(), params, user);
    const results: any[] = await query.count();

    return parseInt(results[0].count, 10);
  }

  public async create(params: any, override: any, user: User) {
    return this.permissions.create(params, override, user);
  }

  public async find(params: any, user: User) {
    const records = await this.query(this.permissions, this.Model.query(), params, user);

    return Promise.all(records.map((record) => this.permissions.read(record, user)));
  }

  public async findOne(id: number | string, user: User) {
    const params = { where: { id } };

    const query = this.query(this.permissions, this.Model.query(), params, user);
    const record = await query.first();

    if (!record) {
      throw new Error("Record not found.");
    }

    return this.permissions.read(record, user);
  }

  public async relate(id: number | string, field: string, childIds: number[] | string[], user: User) {
    const record = await this.Model.query().findById(id);

    if (!record) {
      throw new Error("Record not found.");
    }

    return this.permissions.relate(record, field, childIds, user);
  }

  public async relatedQuery(id: number | string, field: string, params: any, user: User) {
    const record = await this.Model.query().findById(id);

    if (!record) {
      throw new Error("Record not found.");
    }

    const Permissions = record.constructor.relationMappings[field].permissions;
    const permissions = new Permissions();

    const records = await this.query(permissions, record.$relatedQuery(field), params, user);

    return Promise.all(records.map((r) => this.permissions.read(r, user)));
  }

  public async remove(id: number | string, user: User) {
    const record = await this.Model.query().findById(id);

    if (!record) {
      throw new Error("Record not found.");
    }

    return this.permissions.remove(record, user);
  }

  public async unrelate(id: number | string, field: string, childIds: number[] | string[], user: User) {
    const record = await this.Model.query().findById(id);

    if (!record) {
      throw new Error("Record not found.");
    }

    return this.permissions.unrelate(record, field, childIds, user);
  }

  public async update(id: number | string, params: any, override: any, user: User) {
    const record = await this.Model.query().findById(id);

    if (!record) {
      throw new Error("Record not found");
    }

    return this.permissions.update(record, params, override, user);
  }

  /**
   * Applies limit, select, offset, orderBy, and where to a query.
   */
  private query(permissions: BasePermissions<TModel>, query: QueryBuilder<TModel, TModel[], TModel[]>, params: any, user: User) {
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

      const where = permissions.where(user);
      query = query.where((builder) => this.where(builder, where));
    }

    return query;
  }

  /**
   * Applies ORDER BY for each array element. Negative elements are marked as DESC.
   */
  private sort(query: QueryBuilder<TModel, TModel[], TModel[]>, sort: string[]) {
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
   * Parses Mongo-like syntax and converts it into SQL.
   */
  private where(query: QueryBuilder<TModel, TModel[], TModel[]>, params: any, isAnd = true) {
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
