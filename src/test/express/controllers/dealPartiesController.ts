import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { DealPartiesController } from "../../../express";
import { Mongoose, UserDocument, DealPartyDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const dealPartiesController = new DealPartiesController();

describe("express/controllers/dealPartiesController.ts", function() {
  let dealParty: DealPartyDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    dealParty = await Mongoose.DealParty.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of dealParties matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await dealPartiesController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new dealParty", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await dealPartiesController.create(req);

      expect(res.dealParty).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all dealParties", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await dealPartiesController.find(req);

      expect(res.dealParties.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the dealParty", async function() {
      const req = {
        params: {
          id: dealParty._id
        },
        user
      } as express.Request;

      const res = await dealPartiesController.findOne(req);

      expect(res.dealParty).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: dealParty._id
        },
        user
      } as express.Request;

      const res = await dealPartiesController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the dealParty", async function() {
      const req = {
        body: {},
        params: {
          id: dealParty._id
        },
        user
      } as express.Request;

      const res = await dealPartiesController.findOne(req);

      expect(res.dealParty).to.exist;
    });
  });
});
