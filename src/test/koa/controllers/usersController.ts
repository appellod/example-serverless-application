import { expect } from "chai";
import { Chance } from "chance";
import { Context } from "koa";
import { UsersController } from "../../../koa";
import { User, UserDocument } from "../../../mongoose";

const chance = new Chance();
const usersController = new UsersController();

describe("koa/controllers/usersController.ts", function() {
  let user: UserDocument;

  beforeEach(async function() {
    user = await User.mock({ level: 1 });
  });

  describe("count()", function() {
    it("returns the number of users matching the criteria", async function() {
      const ctx = {
        query: {},
        state: { user }
      } as Context;

      await usersController.count(ctx);

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

      await usersController.create(ctx);

      expect(ctx.body.user).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all users", async function() {
      const ctx = {
        query: {},
        state: { user }
      } as Context;

      await usersController.find(ctx);

      expect(ctx.body.users.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the user", async function() {
      const ctx = {
        params: {
          id: user._id
        },
        state: { user }
      } as Context;

      await usersController.findOne(ctx);

      expect(ctx.body.user).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns the removed record", async function() {
      const ctx = {
        params: {
          id: user._id
        },
        state: { user }
      } as Context;

      await usersController.remove(ctx);

      expect(ctx.body.user).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the user", async function() {
      const ctx = {
        params: {
          id: user._id
        },
        request: {
          body: {
            email: chance.email(),
            level: user.level + 1
          }
        },
        state: { user }
      } as Context;

      await usersController.findOne(ctx);

      expect(ctx.body.user).to.exist;
    });
  });
});
