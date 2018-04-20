import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { OffersController } from "../../../express";
import { Mongoose, UserDocument, OfferDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const offersController = new OffersController();

describe("express/controllers/offersController.ts", function() {
  let offer: OfferDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    offer = await Mongoose.Offer.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of offers matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await offersController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new offer", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await offersController.create(req);

      expect(res.offer).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all offers", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await offersController.find(req);

      expect(res.offers.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the offer", async function() {
      const req = {
        params: {
          id: offer._id
        },
        user
      } as express.Request;

      const res = await offersController.findOne(req);

      expect(res.offer).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: offer._id
        },
        user
      } as express.Request;

      const res = await offersController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the offer", async function() {
      const req = {
        body: {},
        params: {
          id: offer._id
        },
        user
      } as express.Request;

      const res = await offersController.findOne(req);

      expect(res.offer).to.exist;
    });
  });
});
