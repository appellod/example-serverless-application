import * as chai from "chai";
import { Chance } from "chance";
import * as express from "express";

import { UsersController } from "../../../express/controllers/users";
import { Mongoose } from "../../../mongoose";
import { UserDocument } from "../../../mongoose/models/user";

const index = require("../../");

const chance = new Chance();
const expect = chai.expect;
const usersController = new UsersController();

describe("express/controllers/users.ts", function() {
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock({ level: 1 });
  });

  describe("create()", function() {
    it("creates a new user", async function() {
      const req = {
        body: {
          email: chance.email(),
          password: chance.hash()
        },
        user
      } as express.Request;

      const res = await usersController.create(req);

      expect(res.user).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all users", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await usersController.find(req);

      expect(res.users.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the user", async function() {
      const req = {
        params: {
          id: user._id
        },
        user
      } as express.Request;

      const res = await usersController.findOne(req);

      expect(res.user).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: user._id
        },
        user
      } as express.Request;

      const res = await usersController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the user", async function() {
      const req = {
        body: {
          email: chance.email(),
          level: user.level + 1
        },
        params: {
          id: user._id
        },
        user
      } as express.Request;

      const res = await usersController.findOne(req);

      expect(res.user).to.exist;
    });
  });
});
