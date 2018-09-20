import { expect } from "chai";
import { Chance } from "chance";

import { HttpContextMock, FunctionRequestMock } from "../../../../src/common/serverless/mocks";
import { User } from "../../../../src/common/postgres";
import { UserMock } from "../../../../src/common/postgres/mocks";
import * as controller from "../../../../src/serverless/api/controllers/users";

const chance = new Chance();

describe("serverless/api/controllers/users.ts", function() {
  let user: User;

  beforeEach(async function() {
    user = await new UserMock({ level: 1 }).create();
  });

  describe("count()", function() {
    it("returns the number of users matching the criteria", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({ user });

      await controller.count(ctx, req);

      expect(ctx.res.body.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new user", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          email: chance.email(),
          password: chance.hash()
        },
        user
      });

      await controller.create(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all users", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({ user });

      await controller.find(ctx, req);

      expect(ctx.res.body.records.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the user", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        params: {
          id: user.id
        },
        user
      });

      await controller.findOne(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("relateFriends()", function() {
    it("returns the parent", async function() {
      const child = await new UserMock().create();

      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          ids: [child.id]
        },
        params: {
          id: user.id
        },
        user
      });

      await controller.relateFriends(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("relateIgnoredUsers()", function() {
    it("returns the parent", async function() {
      const child = await new UserMock().create();

      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          ids: [child.id]
        },
        params: {
          id: user.id
        },
        user
      });

      await controller.relateIgnoredUsers(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns the removed record", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        params: {
          id: user.id
        },
        user
      });

      await controller.remove(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("unrelateFriends()", function() {
    it("returns the parent", async function() {
      const child = await new UserMock().create();

      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          ids: [child.id]
        },
        params: {
          id: user.id
        },
        user
      });

      await controller.unrelateFriends(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("unrelateIgnoredUsers()", function() {
    it("returns the parent", async function() {
      const child = await new UserMock().create();

      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          ids: [child.id]
        },
        params: {
          id: user.id
        },
        user
      });

      await controller.unrelateIgnoredUsers(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the user", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          email: chance.email(),
          level: user.level + 1
        },
        params: {
          id: user.id
        },
        user
      });

      await controller.findOne(ctx, req);

      expect(ctx.res.body.record).to.exist;
    });
  });
});
