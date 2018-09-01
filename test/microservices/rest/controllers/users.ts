import { expect } from "chai";
import { Chance } from "chance";
import { Context } from "koa";

import { UsersController } from "../../../../src/microservices/rest/controllers";
import { User } from "../../../../src/common/postgres";
import { UserMock } from "../../../common/postgres/mocks";

const chance = new Chance();
const controller = new UsersController();

describe("microservices/rest/controllers/users.ts", function() {
  let user: User;

  beforeEach(async function() {
    user = await UserMock.insert({ level: 1 });
  });

  describe("count()", function() {
    it("returns the number of users matching the criteria", async function() {
      const ctx = {
        query: {},
        state: { user }
      } as Context;

      await controller.count(ctx);

      expect(ctx.body.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new user", async function() {
      const ctx = {
        request: {
          body: {
            email: chance.email(),
            password: chance.hash()
          }
        },
        state: { user }
      } as Context;

      await controller.create(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all users", async function() {
      const ctx = {
        query: {},
        state: { user }
      } as Context;

      await controller.find(ctx);

      expect(ctx.body.records.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the user", async function() {
      const ctx = {
        params: {
          id: user.id
        },
        state: { user }
      } as Context;

      await controller.findOne(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("relateFriends()", function() {
    it("returns the parent", async function() {
      const child = await UserMock.insert();

      const ctx = {
        params: {
          id: user.id
        },
        request: {
          body: {
            childIds: [child.id],
            field: "friends"
          }
        },
        state: { user }
      } as Context;

      await controller.relateFriends(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("relateIgnoredUsers()", function() {
    it("returns the parent", async function() {
      const child = await UserMock.insert();

      const ctx = {
        params: {
          id: user.id
        },
        request: {
          body: {
            childIds: [child.id],
            field: "friends"
          }
        },
        state: { user }
      } as Context;

      await controller.relateIgnoredUsers(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns the removed record", async function() {
      const ctx = {
        params: {
          id: user.id
        },
        state: { user }
      } as Context;

      await controller.remove(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("unrelateFriends()", function() {
    it("returns the parent", async function() {
      const child = await UserMock.insert();

      const ctx = {
        params: {
          id: user.id
        },
        request: {
          body: {
            childIds: [child.id],
            field: "friends"
          }
        },
        state: { user }
      } as Context;

      await controller.unrelateFriends(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("unrelateIgnoredUsers()", function() {
    it("returns the parent", async function() {
      const child = await UserMock.insert();

      const ctx = {
        params: {
          id: user.id
        },
        request: {
          body: {
            childIds: [child.id],
            field: "friends"
          }
        },
        state: { user }
      } as Context;

      await controller.unrelateIgnoredUsers(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the user", async function() {
      const ctx = {
        params: {
          id: user.id
        },
        request: {
          body: {
            email: chance.email(),
            level: user.level + 1
          }
        },
        state: { user }
      } as Context;

      await controller.findOne(ctx);

      expect(ctx.body.record).to.exist;
    });
  });
});
