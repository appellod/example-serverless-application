import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { ListingsController } from "../../../express";
import { Mongoose, UserDocument, ListingDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const listingsController = new ListingsController();

describe("express/controllers/listingsController.ts", function() {
  let listing: ListingDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    listing = await Mongoose.Listing.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of listings matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await listingsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new listing", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await listingsController.create(req);

      expect(res.listing).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all listings", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await listingsController.find(req);

      expect(res.listings.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the listing", async function() {
      const req = {
        params: {
          id: listing._id
        },
        user
      } as express.Request;

      const res = await listingsController.findOne(req);

      expect(res.listing).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: listing._id
        },
        user
      } as express.Request;

      const res = await listingsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the listing", async function() {
      const req = {
        body: {},
        params: {
          id: listing._id
        },
        user
      } as express.Request;

      const res = await listingsController.findOne(req);

      expect(res.listing).to.exist;
    });
  });
});
