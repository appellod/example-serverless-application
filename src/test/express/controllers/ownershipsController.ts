import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { OwnershipsController } from "../../../express";
import { Mongoose, UserDocument, OwnershipDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const ownershipsController = new OwnershipsController();

describe("express/controllers/ownershipsController.ts", function() {
  let ownership: OwnershipDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    ownership = await Mongoose.Ownership.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of ownerships matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await ownershipsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new ownership", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await ownershipsController.create(req);

      expect(res.ownership).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all ownerships", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await ownershipsController.find(req);

      expect(res.ownerships.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the ownership", async function() {
      const req = {
        params: {
          id: ownership._id
        },
        user
      } as express.Request;

      const res = await ownershipsController.findOne(req);

      expect(res.ownership).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: ownership._id
        },
        user
      } as express.Request;

      const res = await ownershipsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the ownership", async function() {
      const req = {
        body: {},
        params: {
          id: ownership._id
        },
        user
      } as express.Request;

      const res = await ownershipsController.findOne(req);

      expect(res.ownership).to.exist;
    });
  });
});
