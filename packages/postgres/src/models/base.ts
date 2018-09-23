import { Model, QueryContext } from "objection";

export class BaseModel extends Model {

  constructor(params: any = {}) {
    super();

    Object.assign(this, params);
  }

  public async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
  }

  public async $beforeUpdate(opts: any, queryContext: QueryContext) {
    await super.$beforeUpdate(opts, queryContext);
  }

  public async create() {
    return this.$query().insert(this).returning("*");
  }

  public async update() {
    return this.$query().update(this).returning("*");
  }

}
