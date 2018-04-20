import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { PursuitsController } from "../../../express";
import { Mongoose, UserDocument, PursuitDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const pursuitsController = new PursuitsController();

describe("express/controllers/pursuitsController.ts", function() {
  let pursuit: PursuitDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    pursuit = await Mongoose.Pursuit.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of pursuits matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await pursuitsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new pursuit", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await pursuitsController.create(req);

      expect(res.pursuit).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all pursuits", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await pursuitsController.find(req);

      expect(res.pursuits.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the pursuit", async function() {
      const req = {
        params: {
          id: pursuit._id
        },
        user
      } as express.Request;

      const res = await pursuitsController.findOne(req);

      expect(res.pursuit).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: pursuit._id
        },
        user
      } as express.Request;

      const res = await pursuitsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the pursuit", async function() {
      const req = {
        body: {},
        params: {
          id: pursuit._id
        },
        user
      } as express.Request;

      const res = await pursuitsController.findOne(req);

      expect(res.pursuit).to.exist;
    });
  });
});
