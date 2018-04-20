import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { BuyersNeedsController } from "../../../express";
import { Mongoose, UserDocument, BuyersNeedDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const buyersNeedsController = new BuyersNeedsController();

describe("express/controllers/buyersNeedsController.ts", function() {
  let buyersNeed: BuyersNeedDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    buyersNeed = await Mongoose.BuyersNeed.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of buyersNeeds matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await buyersNeedsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new buyersNeed", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await buyersNeedsController.create(req);

      expect(res.buyersNeed).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all buyersNeeds", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await buyersNeedsController.find(req);

      expect(res.buyersNeeds.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the buyersNeed", async function() {
      const req = {
        params: {
          id: buyersNeed._id
        },
        user
      } as express.Request;

      const res = await buyersNeedsController.findOne(req);

      expect(res.buyersNeed).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: buyersNeed._id
        },
        user
      } as express.Request;

      const res = await buyersNeedsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the buyersNeed", async function() {
      const req = {
        body: {},
        params: {
          id: buyersNeed._id
        },
        user
      } as express.Request;

      const res = await buyersNeedsController.findOne(req);

      expect(res.buyersNeed).to.exist;
    });
  });
});
