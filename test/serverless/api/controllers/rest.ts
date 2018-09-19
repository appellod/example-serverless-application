import { expect } from "chai";
import { QueryBuilder } from "objection";

import { RestController } from "../../../../src/serverless/api/controllers/rest";
import { User, UserPermissions } from "../../../../src/common/postgres";
import { UserMock } from "../../../common/postgres/mocks";

class TestController extends RestController<User, UserPermissions> {
  constructor() {
    super(User, new UserPermissions());
  }
}

const controller = new TestController();

describe("serverless/api/controllers/rest.ts", function() {
  describe("count()", function() {
    let users: User[];

    beforeEach(async function() {
      users = await Promise.all([
        new UserMock({ id: 1 }).create(),
        new UserMock({ id: 2 }).create(),
        new UserMock({ id: 3 }).create()
      ]);
    });

    it("follows the where clause", async function() {
      const params = {
        where: { id: { $gt: users[0].id } }
      };

      const count = await controller.count(params, users[0]);

      expect(count).to.eql(2);
    });

    it("enforces where permissions", async function() {
      const admin = await new UserMock({ level: 1 }).create();
      const params = {
        where: { $or: [{ level: 0 }, { level: 1}] }
      };

      const count = await controller.count(params, users[0]);

      expect(count).to.eql(0);
    });
  });

  describe("find()", function() {
    let users: User[];

    beforeEach(async function() {
      users = await Promise.all([
        new UserMock({ id: 1 }).create(),
        new UserMock({ id: 2 }).create(),
        new UserMock({ id: 3 }).create()
      ]);
    });

    it("follows the limit clause", async function() {
      const params = {
        limit: 2,
        sort: ["id"]
      };
      const records = await controller.find(params, users[0]);

      expect(records.length).to.eql(2);
    });

    it("follows the skip clause", async function() {
      const params = {
        skip: 1,
        sort: ["id"]
      };

      const records = await controller.find(params, users[0]);

      const ids = records.map((r) => r.id);
      expect(ids).to.not.contain(users[0].id);
    });

    it("follows the sort clause", async function() {
      const params = { sort: ["-id"] };

      const records = await controller.find(params, users[0]);

      expect(records[0].id).to.eql(users[2].id);
      expect(records[2].id).to.eql(users[0].id);
    });

    it("follows the select clause", async function() {
      const params = {
        select: ["email"],
        sort: ["id"]
      };

      const records = await controller.find(params, users[0]);

      const record = records[0];
      expect(record.id).to.be.undefined;
      expect(record.email).to.eql(users[0].email);
      expect(record.level).to.be.undefined;
    });

    it("follows the where clause", async function() {
      const params = {
        sort: ["id"],
        where: { id: { $gt: users[0].id } }
      };

      const records = await controller.find(params, users[0]);

      const ids = records.map((r) => r.id);
      expect(ids).to.not.contain(users[0].id);
    });

    it("enforces where permissions", async function() {
      const admin = await new UserMock({ level: 1 }).create();
      const params = {
        where: { level: 1 }
      };

      const records = await controller.find(params, users[0]);

      const ids = records.map((r) => r.id);
      expect(ids).to.not.contain(admin.id);
    });
  });

  describe("findOne()", function() {
    let users: User[];

    beforeEach(async function() {
      users = await Promise.all([
        new UserMock({ id: 1 }).create(),
        new UserMock({ id: 2 }).create(),
        new UserMock({ id: 3 }).create()
      ]);
    });

    it("finds the user with the correct id", async function() {
      const user = users[1];

      const record = await controller.findOne(user.id, users[0]);

      expect(record.id).to.eql(user.id);
    });
  });

  describe("sort()", function() {
    it("sets the ORDER BY statement to the correct value", function() {
      let query = User.query();

      const sort = ["email", "-password"];
      query = controller["sort"](query, sort);

      const sql = query.toSql();
      expect(sql).to.contain(`order by "email" asc, "password" desc`);
    });
  });

  describe("where()", function() {
    let query: QueryBuilder<User, User[], User[]>;

    beforeEach(function() {
      query = User.query();
    });

    it("handles no operator", function() {
      const where = { level: 0 };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" = 0`);
    });

    it("handles $eq", function() {
      const where = { level: { $eq: 0 } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" = 0`);
    });

    it("handles $gt", function() {
      const where = { level: { $gt: 0 } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" > 0`);
    });

    it("handles $gte", function() {
      const where = { level: { $gte: 0 } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" >= 0`);
    });

    it("handles $in", function() {
      const where = { level: { $in: [0, 1] } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" in (0, 1)`);
    });

    it("handles $lt", function() {
      const where = { level: { $lt: 0 } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" < 0`);
    });

    it("handles $lte", function() {
      const where = { level: { $lte: 0 } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" <= 0`);
    });

    it("handles $ne", function() {
      const where = { level: { $ne: 0 } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`not "level" = 0`);
    });

    it("handles $nin", function() {
      const where = { level: { $nin: [0, 1] } };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" not in (0, 1)`);
    });

    it("handles $and", function() {
      const where = { $and: [{ level: { $eq: 0 } }, { level: { $ne: 1 } }] };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" = 0 and not "level" = 1`);
    });

    it("handles $or", function() {
      const where = { $or: [{ level: { $eq: 0 } }, { level: { $ne: 1 } }] };
      query = controller["where"](query, where);

      const sql = query.toSql();
      expect(sql).to.contain(`"level" = 0 or not "level" = 1`);
    });
  });
});
